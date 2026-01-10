import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core/primitives/di';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Layout } from '../services/layout';
import { UtilService } from '../services/util.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const _layout = inject(Layout)
  const utilService = inject(UtilService)

  return next(req).pipe(
    catchError((response: HttpErrorResponse) => {
      console.log('Error intercepted:', response);
      _layout.loader = false;
      utilService.notify("An error occurred: " + response.error.message);
      return throwError(() => response.error.message);
    })
  )
};
