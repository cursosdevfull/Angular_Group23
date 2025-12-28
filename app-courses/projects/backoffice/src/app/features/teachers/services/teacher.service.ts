import { inject, Injectable, signal } from "@angular/core";
import { toObservable, toSignal } from "@angular/core/rxjs-interop";
import { Observable, of, switchMap, merge, tap } from "rxjs";
import { Layout } from "../../../core/services/layout";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environment";

export interface Teacher {
    id?: number;
    name: string;
    lastname: string;
    email: string;
    phone?: string;
    summary?: string;
    linkedin?: string;
    photoUrl?: string;
    skills: string[];
}

@Injectable({ providedIn: 'root' })
export class TeacherService {
    private _layout = inject(Layout)
    private http = inject(HttpClient);
    private readonly pageSize = 18;

    // Update Teacher
    updateTeacher = signal<Teacher | null>(null);
    obsUpdate = toObservable(this.updateTeacher).pipe(
        switchMap((teacher) => {
            if (teacher) {
                return this.onUpdateTeacher(teacher.id!, teacher);
            }
            return of(null);
        }),
        tap(() => this._layout.loader = false)
    )
    teacherUpdated = toSignal(this.obsUpdate, { initialValue: null });
    onUpdateTeacher(id: number, teacher: Teacher) {
        this._layout.loader = true;
        const data = Object.assign({}, teacher);
        delete data.id;
        return this.http.put(`${environment.apiUrl}/teachers/${id}`, data);
    }

    // Create Teacher
    createTeacher = signal<Teacher | null>(null);
    obsCreate = toObservable(this.createTeacher).pipe(
        switchMap((teacher) => {
            if (teacher) {
                return this.onCreateTeacher(teacher);
            }
            return of(null);
        }),
        tap(() => this._layout.loader = false)
    )
    teacherCreated = toSignal(this.obsCreate, { initialValue: null });
    private onCreateTeacher(teacher: Teacher) {
        this._layout.loader = true;
        return this.http.post(`${environment.apiUrl}/teachers`, teacher);
    }

    // Delete Teacher
    deleteTeacher = signal<number | null>(null);
    obsDelete = toObservable(this.deleteTeacher).pipe(
        switchMap((id) => {
            if (id) {
                return this.onDeleteTeacher(id);
            }
            return of(null);
        }),
        tap(() => this._layout.loader = false)
    )
    teacherDeleted = toSignal(this.obsDelete, { initialValue: null });
    private onDeleteTeacher(id: number) {
        this._layout.loader = true;
        return this.http.delete(`${environment.apiUrl}/teachers/${id}`);
    }

    // List Teachers with Pagination
    currentPage = signal<number>(1);

    private obs = merge(
        toObservable(this.currentPage),
        toObservable(this.teacherUpdated),
        toObservable(this.teacherCreated),
        toObservable(this.teacherDeleted)
    )
        .pipe(
            switchMap(() => {
                return this.loadTeachersPage(this.currentPage());
            }),
            tap(() => this._layout.loader = false)
        )
    listTeachers = toSignal(this.obs, { initialValue: { data: [], hasMore: false } });

    private loadTeachersPage(page: number): Observable<{ data: any[], hasMore: boolean }> {
        this._layout.loader = true;
        return this.http.get<{ data: any[], hasMore: boolean }>(`${environment.apiUrl}/teachers?page=${page}&limit=${this.pageSize}`)
    }
}