import { CanMatchFn } from "@angular/router";

export const toggleGuard: CanMatchFn = (route, state) => {
    return true;
}