import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { SettingsIndexComponent } from './containers/settings-index/settings-index.component';
import { EffectsModule } from '@ngrx/effects';
import { UiElementsModule } from '@bushtrade/ui-elements';
import * as fromUiStyle from '@bushtrade/administration-portal/shared/state';
import { UiStyleEffects } from '@bushtrade/administration-portal/shared/state';
import { StoreModule } from '@ngrx/store';

@NgModule({
  imports: [
    CommonModule,
    UiElementsModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: SettingsIndexComponent },
    ]),
    StoreModule.forFeature(
      fromUiStyle.UISTYLE_FEATURE_KEY,
      fromUiStyle.reducer
    ),
    EffectsModule.forFeature([UiStyleEffects]),
  ],
  declarations: [SettingsIndexComponent],
})
export class AdministrationPortalSettingsModule {}
