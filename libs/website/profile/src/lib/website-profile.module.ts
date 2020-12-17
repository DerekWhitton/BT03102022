import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Store, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromShared from '@bushtrade/website/shared/state';
import { ProfileIndexComponent } from './containers/profile-index/profile-index.component';
import { UiElementsModule } from '@bushtrade/ui-elements';

@NgModule({
  imports: [
    CommonModule,
    UiElementsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: ProfileIndexComponent },
    ]),

    StoreModule.forFeature(fromShared.USER_FEATURE_KEY, fromShared.userReducer),
    EffectsModule.forFeature([fromShared.UserEffects]),
  ],
  declarations: [ProfileIndexComponent],
  providers: [],
})
export class WebsiteProfileModule {}
