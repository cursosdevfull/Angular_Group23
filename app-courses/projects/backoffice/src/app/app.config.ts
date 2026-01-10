import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideLottieOptions } from 'ngx-lottie';
import player from 'lottie-web';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { errorInterceptor } from './core/interceptors';

registerLocaleData(localeEs, 'es-PE'); // Use 'es-PE' as the ID

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideLottieOptions({
      player: () => player,
    }),
    provideHttpClient(withFetch(), withInterceptors([
      errorInterceptor
    ])),
    { provide: MAT_DATE_LOCALE, useValue: 'es-PE' }
  ]
};
