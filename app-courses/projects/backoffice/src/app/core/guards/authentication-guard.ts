import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../features/auth/services/auth.service';

export const authenticationGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)
  const router = inject(Router)
  const isLogged = authService.isLogged();

  if (!isLogged) {
    router.navigate(['login']);
  }

  return isLogged;
};
