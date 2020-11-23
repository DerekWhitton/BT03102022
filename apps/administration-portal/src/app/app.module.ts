import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AdministrationPortalAdministrationAppModule } from '@bushtrade/administration-portal/app';
import { ActionReducer, StoreModule } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import * as fromUiStyle from '@bushtrade/administration-portal/shared/state';
import { UiStyleEffects } from '@bushtrade/administration-portal/shared/state';
import { EffectsModule } from '@ngrx/effects';
import { environment } from '../environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { APP_CONFIG } from '@bushtrade/app-config';

export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({
    keys: [fromUiStyle.UISTYLE_FEATURE_KEY],
    rehydrate: true,
  })(reducer);
}
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AdministrationPortalAdministrationAppModule,
    StoreModule.forRoot(
      {
        [fromUiStyle.UISTYLE_FEATURE_KEY]: fromUiStyle.reducer,
      },
      {
        metaReducers: [localStorageSyncReducer],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      }
    ),
    EffectsModule.forRoot([UiStyleEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule.forRoot(),
  ],
  providers: [{ provide: APP_CONFIG, useValue: environment }],
  bootstrap: [AppComponent],
})
export class AppModule {}
