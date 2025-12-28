import { inject, Injectable, signal } from "@angular/core";
import { toObservable, toSignal } from "@angular/core/rxjs-interop";
import { Observable, of, switchMap, merge, tap } from "rxjs";
import { Layout } from "../../../core/services/layout";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environment";

@Injectable({ providedIn: 'root' })
export class CourseService {
    private _layout = inject(Layout)
    private http = inject(HttpClient);
    private readonly pageSize = 18;

    // Update Course
    updateCourse = signal<{ id: number, title: string } | null>(null);
    obsUpdate = toObservable(this.updateCourse).pipe(
        switchMap((course) => {
            if (course) {
                return this.onUpdateCourse(course.id, course.title);
            }
            return of(null);
        }),
        tap(() => this._layout.loader = false)
    )
    courseUpdated = toSignal(this.obsUpdate, { initialValue: null });
    onUpdateCourse(id: number, title: string) {
        this._layout.loader = true;
        return this.http.put(`${environment.apiUrl}/courses/${id}`, { title });
    }

    // Create Course
    createCourse = signal<{ title: string } | null>(null);
    obsCreate = toObservable(this.createCourse).pipe(
        switchMap((course) => {
            if (course) {
                return this.onCreateCourse(course);
            }
            return of(null);
        }),
        tap(() => this._layout.loader = false)
    )
    courseCreated = toSignal(this.obsCreate, { initialValue: null });
    private onCreateCourse(course: { title: string }) {
        this._layout.loader = true;
        return this.http.post(`${environment.apiUrl}/courses`, { title: course.title });
    }

    // Delete Course
    deleteCourse = signal<number | null>(null);
    obsDelete = toObservable(this.deleteCourse).pipe(
        switchMap((id) => {
            if (id) {
                return this.onDeleteCourse(id);
            }
            return of(null);
        }),
        tap(() => this._layout.loader = false)
    )
    courseDeleted = toSignal(this.obsDelete, { initialValue: null });
    private onDeleteCourse(id: number) {
        this._layout.loader = true;
        return this.http.delete(`${environment.apiUrl}/courses/${id}`);
    }

    // List Courses with Pagination
    currentPage = signal<number>(1);

    private obs = merge(
        toObservable(this.currentPage),
        toObservable(this.courseUpdated),
        toObservable(this.courseCreated),
        toObservable(this.courseDeleted)
    )
        .pipe(
            switchMap(() => {
                return this.loadCoursesPage(this.currentPage());
            }),
            tap(() => this._layout.loader = false)
        )
    listCourses = toSignal(this.obs, { initialValue: { data: [], hasMore: false } });

    private loadCoursesPage(page: number): Observable<{ data: any[], hasMore: boolean }> {
        this._layout.loader = true;
        return this.http.get<{ data: any[], hasMore: boolean }>(`${environment.apiUrl}/courses?page=${page}&limit=${this.pageSize}`)
    }
}