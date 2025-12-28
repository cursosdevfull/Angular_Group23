import { inject, Injectable, signal } from "@angular/core";
import { toObservable, toSignal } from "@angular/core/rxjs-interop";
import { Observable, of, switchMap, merge, tap, map } from "rxjs";
import { Layout } from "../../../core/services/layout";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environment";
import { DatePipe } from "@angular/common";

export interface Schedule {
    id?: number;
    imageUrl?: string;
    resume?: string;
    goals: string[];
    syllabus: string[];
    requirements: string[];
    frequency?: string;
    start: string;
    rangeHours?: string;
    slogan?: string;
    title: string;
    duration?: number;
    courseId: number;
    teacherId: number;
    course?: any;
    teacher?: any;
}

@Injectable({ providedIn: 'root' })
export class ScheduleService {
    private _layout = inject(Layout)
    private http = inject(HttpClient);
    private datePipe = new DatePipe('es-PE');
    private readonly pageSize = 18;

    // Update Schedule
    updateSchedule = signal<Schedule | null>(null);
    obsUpdate = toObservable(this.updateSchedule).pipe(
        switchMap((schedule) => {
            if (schedule) {
                return this.onUpdateSchedule(schedule.id!, schedule);
            }
            return of(null);
        }),
        tap(() => this._layout.loader = false)
    )
    scheduleUpdated = toSignal(this.obsUpdate, { initialValue: null });
    onUpdateSchedule(id: number, schedule: Schedule) {
        this._layout.loader = true;
        return this.http.put(`${environment.apiUrl}/schedules/${id}`, schedule);
    }

    // Create Schedule
    createSchedule = signal<Schedule | null>(null);
    obsCreate = toObservable(this.createSchedule).pipe(
        switchMap((schedule) => {
            if (schedule) {
                return this.onCreateSchedule(schedule);
            }
            return of(null);
        }),
        tap(() => this._layout.loader = false)
    )
    scheduleCreated = toSignal(this.obsCreate, { initialValue: null });
    private onCreateSchedule(schedule: Schedule) {
        this._layout.loader = true;
        return this.http.post(`${environment.apiUrl}/schedules`, schedule);
    }

    // Delete Schedule
    deleteSchedule = signal<number | null>(null);
    obsDelete = toObservable(this.deleteSchedule).pipe(
        switchMap((id) => {
            if (id) {
                return this.onDeleteSchedule(id);
            }
            return of(null);
        }),
        tap(() => this._layout.loader = false)
    )
    scheduleDeleted = toSignal(this.obsDelete, { initialValue: null });
    private onDeleteSchedule(id: number) {
        this._layout.loader = true;
        return this.http.delete(`${environment.apiUrl}/schedules/${id}`);
    }

    // List Schedules with Pagination
    currentPage = signal<number>(1);

    private obs = merge(
        toObservable(this.currentPage),
        toObservable(this.scheduleUpdated),
        toObservable(this.scheduleCreated),
        toObservable(this.scheduleDeleted)
    )
        .pipe(
            switchMap(() => {
                return this.loadSchedulesPage(this.currentPage());
            }),
            tap((result) => {
                console.log('Schedules loaded:', result);
                this._layout.loader = false
            })
        )
    listSchedules = toSignal(this.obs, { initialValue: { data: [], hasMore: false } });

    private loadSchedulesPage(page: number): Observable<{ data: any[], hasMore: boolean }> {
        this._layout.loader = true;
        return this.http
            .get<{ data: any[], hasMore: boolean }>(`${environment.apiUrl}/schedules?page=${page}&limit=${this.pageSize}`)
            .pipe(map(schedule => ({ ...schedule, data: schedule.data.map(sch => ({ ...sch, start: this.datePipe.transform(sch.start, "dd/MMM/yyyy"), course: `${sch.course.title}`, teacher: `${sch.teacher.name} ${sch.teacher.lastname}` })) })));
    }

    courseSelected = signal<number | null>(1);
    obsCourses = toObservable(this.courseSelected).pipe(
        switchMap((courseId) => {
            if (courseId !== null) {
                return this.getCourses()
            }
            return of([]);
        })
    )
    listCourses = toSignal<{ id: number, title: string }[] | null>(this.obsCourses, { initialValue: null });

    teacherSelected = signal<number | null>(1);
    obsTeachers = toObservable(this.teacherSelected).pipe(
        switchMap((teacherId) => {
            if (teacherId !== null) {
                return this.getTeachers()
            }
            return of([]);
        }))
    listTeachers = toSignal<{ id: number, name: string, lastname: string }[] | null>(this.obsTeachers, { initialValue: null });

    // Get Courses for dropdown
    getCourses(): Observable<any[]> {
        return this.http.get<any[]>(`${environment.apiUrl}/courses/all`);
    }

    // Get Teachers for dropdown  
    getTeachers(): Observable<any[]> {
        return this.http.get<any[]>(`${environment.apiUrl}/teachers/all`);
    }
}