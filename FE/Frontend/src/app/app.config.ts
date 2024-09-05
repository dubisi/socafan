import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from './services/auth/auth.service';
import { AuthInterceptor } from './services/auth.interceptor';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/in-memory-data/in-memory-data.service';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), MatCardModule, AuthService,
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }, provideHttpClient()],
};
