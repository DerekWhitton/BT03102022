import { UiModule } from '@bushtrade/ui';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { AdvertisementsIndexComponent } from './containers/advertisements-index/advertisements-index.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromDashboardAdvertisments from './+state/dashboard-advertisments.reducer';
import { DashboardAdvertismentsEffects } from './+state/dashboard-advertisments.effects';
import { DashboardAdvertismentsFacade } from './+state/dashboard-advertisments.facade';
import { UiElementsModule } from '@bushtrade/ui-elements';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export const administrationPortalAdvertismentsRoutes: Route[] = [];

@NgModule({
  imports: [
    CommonModule,
    UiModule,
    UiElementsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: AdvertisementsIndexComponent },
    ]),
    StoreModule.forFeature(
      fromDashboardAdvertisments.DASHBOARDADVERTISMENTS_FEATURE_KEY,
      fromDashboardAdvertisments.reducer
    ),
    EffectsModule.forFeature([DashboardAdvertismentsEffects]),
  ],
  declarations: [AdvertisementsIndexComponent],
  entryComponents: [AdvertisementsIndexComponent],
  providers: [DashboardAdvertismentsFacade],
})
export class AdministrationPortalAdvertismentsModule {}
