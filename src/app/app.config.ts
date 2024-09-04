import { ApplicationConfig, importProvidersFrom, inject, provideZoneChangeDetection } from "@angular/core";
import { PreloadAllModules, provideRouter, withPreloading } from "@angular/router";

import { routes } from "./app.routes";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { JwtModule } from "@auth0/angular-jwt";
import { AuthService } from "./shared/services/auth.service";
import { IconService } from "./shared/services/icon.service";

const tokenGetter = () => {
  return inject(AuthService).getCurrentToken();
};
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi()),
    IconService,
    importProvidersFrom(
      JwtModule.forRoot({
        config: {
          tokenGetter: tokenGetter,
        },
      })
    ),
  ],
};
