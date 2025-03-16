import {
  ApplicationConfig, ErrorHandler,
  inject,
  provideAppInitializer,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { PostManagerService } from './core/service/PostManager/post-manager.service';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { providePrimeNG } from 'primeng/config';
import {GlobalErrorHandler} from './core/ErrorManager/GlobalErrorHandler';
import {MessageService} from 'primeng/api';
import {LaraOP} from './core/themes/LaraOP';
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(),
    provideAppInitializer(() => {
      inject(PostManagerService).recuperaPostViaHttp();
    }),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: LaraOP,
        options:{
          darkModeSelector: false
        }
      },
    }),
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler,
    },
    {
      provide: MessageService
    }
  ],
};
