import { inject, Injectable, signal } from '@angular/core';
import { Layout } from '../../../core/services/layout';
import { HttpClient } from '@angular/common/http';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { map, merge, Observable, of, switchMap, tap } from 'rxjs';
import { environment } from '../../../environment';

export interface User {
  id?: number;
  name: string;
  email: string;
  password?: string;
  roles?: any;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _layout = inject(Layout)
  private http = inject(HttpClient);
  private readonly pageSize = 18;

  // Update User
  updateUser = signal<User | null>(null);
  obsUpdate = toObservable(this.updateUser).pipe(
    switchMap((user) => {
      if (user) {
        return this.onUpdateUser(user.id!, user);
      }
      return of(null);
    }),
    tap(() => this._layout.loader = false)
  )
  userUpdated = toSignal(this.obsUpdate, { initialValue: null });
  onUpdateUser(id: number, user: User) {
    this._layout.loader = true;
    const data = Object.assign({}, user);
    delete data.id;
    return this.http.put(`${environment.apiUrl}/users/${id}`, data);
  }

  // Create User
  createUser = signal<User | null>(null);
  obsCreate = toObservable(this.createUser).pipe(
    switchMap((user) => {
      if (user) {
        return this.onCreateUser(user);
      }
      return of(null);
    }),
    tap(() => this._layout.loader = false)
  )
  userCreated = toSignal(this.obsCreate, { initialValue: null });
  private onCreateUser(user: User) {
    this._layout.loader = true;
    return this.http.post(`${environment.apiUrl}/users`, user);
  }

  // Delete User
  deleteUser = signal<number | null>(null);
  obsDelete = toObservable(this.deleteUser).pipe(
    switchMap((id) => {
      if (id) {
        return this.onDeleteUser(id);
      }
      return of(null);
    }),
    tap(() => this._layout.loader = false)
  )
  userDeleted = toSignal(this.obsDelete, { initialValue: null });
  private onDeleteUser(id: number) {
    this._layout.loader = true;
    return this.http.delete(`${environment.apiUrl}/users/${id}`);
  }

  // List Users with Pagination
  currentPage = signal<number>(1);

  private obs = merge(
    toObservable(this.currentPage),
    toObservable(this.userUpdated),
    toObservable(this.userCreated),
    toObservable(this.userDeleted),
  )
    .pipe(
      switchMap(() => {
        return this.loadUsersPage(this.currentPage());
      }),
      tap((result) => {
        this._layout.loader = false
      })
    )
  listUsers = toSignal(this.obs, { initialValue: { data: [], hasMore: false } });

  private loadUsersPage(page: number): Observable<{ data: any[], hasMore: boolean }> {
    this._layout.loader = true;
    return this.http
      .get<{ data: any[], hasMore: boolean }>(`${environment.apiUrl}/users?page=${page}&limit=${this.pageSize}`)
      .pipe(map(user => ({ ...user, data: user.data.map(sch => ({ ...sch })) })));
  }

  roleSelected = signal<number | null>(1);
  obsRoles = toObservable(this.roleSelected).pipe(
    switchMap((roleId) => {
      if (roleId !== null) {
        return this.getRoles()
      }
      return of([]);
    })
  )
  listRoles = toSignal<{ id: number, name: string }[] | null>(this.obsRoles, { initialValue: null });

  // Get Roles for dropdown
  getRoles(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/roles`);
  }
}
