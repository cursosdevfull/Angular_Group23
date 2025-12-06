import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
  WritableSignal,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { signal } from '@angular/core';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { DragonBallService } from './dragonball-service';
import { IDragonBall } from './dragonball-interface';
import { IMAGE_CONFIG } from '@angular/common';

export class Dragon {
  characters: WritableSignal<IDragonBall | undefined> = signal<IDragonBall | undefined>(undefined);
}

export const dragon = new Dragon();

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideHttpClient(withFetch()),
    provideRouter(routes),
    {
      provide: IMAGE_CONFIG,
      useValue: {
        disableImageSizeWarning: true,
        disableImageLazyLoadWarning: true,
      },
    },
    /*{
      provide: DragonBallService,
      useClass: DragonBallService,
    },*/
  ],
};
