import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { inject, Injectable, Signal, signal, WritableSignal } from "@angular/core";
import { toObservable, toSignal } from "@angular/core/rxjs-interop";
import { switchMap } from "rxjs/internal/operators/switchMap";
import { Layout } from "../../../core/services/layout";
import { environment } from "../../../environment";
import { of, tap } from "rxjs";
import { TokenService } from "./token.service";
import { Router } from "@angular/router";
import * as jwt from 'jwt-decode';

export type TTokens = { accessToken: string, refreshToken: string }
export type TCredentials = { email: string, password: string }


@Injectable({ providedIn: 'root' })
export class AuthService {
    private http = inject(HttpClient);
    private _layout = inject(Layout)
    private tokenService = inject(TokenService)
    private router = inject(Router)

    auth = signal<TCredentials | null>(null);
    private obsAuth = toObservable<TCredentials | null>(this.auth).pipe(
        switchMap((credentials) => {
            if (credentials) {
                return this.onLogin(credentials.email, credentials.password);
            }
            return of(null);
        }),
        tap(() => { this._layout.loader = false; }),
    )
    userLogged = toSignal<TTokens | null>(this.obsAuth, { initialValue: null })

    private onLogin(email: string, password: string) {
        this._layout.loader = true;
        return this.http.post<TTokens>(`${environment.apiUrl}/auth/login`, { email, password });
    }

    login(credentials: TCredentials) {
        this.auth.set(credentials);
    }

    logout() {
        this.auth.set(null);
        this.tokenService.clear();
        this.router.navigate(['login']);
    }

    get isLogged(): Signal<boolean> {
        return toSignal(
            of(!!this.tokenService.retrieve('access_token')),
            { initialValue: false }
        );
    }

    get roles(): Signal<string[]> {
        const token = this.tokenService.retrieve('access_token');
        if (token) {
            const decodedToken: any = jwt.jwtDecode(token);
            const roles = decodedToken.roles || [];
            return signal(roles);
        }
        return signal([]);
    }

}