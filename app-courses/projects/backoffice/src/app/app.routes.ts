import { Routes } from '@angular/router';
import { PageLogin } from './features/auth/components/page-login/page-login';
import { authenticationGuard, authorizationGuard } from './core/guards';

export const routes: Routes = [
    { path: "login", component: PageLogin },
    { path: "dashboard", canActivate: [authenticationGuard, authorizationGuard], data: { roles: ["admin", "teacher", "student"] }, loadComponent: () => import('./features/dashboard/components/page-dashboard/page-dashboard').then(m => m.PageDashboard) },
    { path: "courses", canActivate: [authenticationGuard, authorizationGuard], data: { roles: ["admin", "teacher", "student"] }, loadComponent: () => import('./features/courses/components/page-courses/page-courses').then(m => m.PageCourses) },
    { path: "teachers", canActivate: [authenticationGuard, authorizationGuard], data: { roles: ["admin", "teacher", "student"] }, loadComponent: () => import('./features/teachers/components/page-teachers/page-teachers').then(m => m.PageTeachers) },
    { path: "schedules", canActivate: [authenticationGuard, authorizationGuard], data: { roles: ["admin", "teacher", "student"] }, loadComponent: () => import('./features/schedules/components/page-schedules/page-schedules').then(m => m.PageSchedules) },
    { path: "users", canActivate: [authenticationGuard, authorizationGuard], data: { roles: ["admin", "teacher", "student"] }, loadComponent: () => import('./features/users/components/page-users/page-users').then(m => m.PageUsers) },
    { path: "**", redirectTo: "login" }
];
