import {
  APP_INITIALIZER,
  ApplicationConfig,
  importProvidersFrom,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { zh_CN, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { StartupService } from './services/startup.service';
import { AppInitializerProvider } from './services/app-initializer.service';
import { defaultInterceptor } from './interceptors/default.interceptor';

registerLocaleData(zh);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideNzI18n(zh_CN),
    importProvidersFrom(FormsModule),
    provideAnimationsAsync(),
    provideHttpClient(),
    AppInitializerProvider,
    provideHttpClient(withInterceptors([defaultInterceptor])),
    {
      provide: APP_INITIALIZER,
      useFactory: (startupService: StartupService) => () => {
        return startupService.startup().toPromise();
      },
      deps: [StartupService],
      multi: true,
    },
  ],
};
