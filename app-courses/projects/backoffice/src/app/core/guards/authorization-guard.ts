import { CanActivateFn } from "@angular/router";
import { AuthService } from "../../features/auth/services/auth.service";
import { inject } from "@angular/core/primitives/di";

export const authorizationGuard: CanActivateFn = (route, state) => {
    if (route.data && route.data["roles"]) {
        const allowedRoles = route.data["roles"] as string[];
        const authService = inject(AuthService);
        const userRoles = authService.roles();

        return allowedRoles.some(role => userRoles.includes(role)) ? true : false;
    } else {
        return false;
    }
}