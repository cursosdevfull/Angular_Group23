import { CanActivateFn } from "@angular/router";

export const authChild: CanActivateFn = (route, state) => {
    return false;
}