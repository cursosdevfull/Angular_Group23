import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { TokenService } from "../../features/auth/services/token.service";

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
    const tokenService = inject(TokenService)

    const token = tokenService.retrieve("access_token")

    if (!token) {
        return next(req)
    } else {
        const clonedReq = req.clone({ headers: req.headers.set("Authorization", `Bearer ${token}`) })
        return next(clonedReq)
    }
}