import { ApplicationConfig, inject, provideAppInitializer, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { PostManagerService } from './core/service/PostManager/post-manager.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(
      routes,
      withComponentInputBinding()
    ),
    provideHttpClient(),
    provideAppInitializer(() => {
      inject(PostManagerService).recuperaPostViaHttp()
    })
  ]
};
