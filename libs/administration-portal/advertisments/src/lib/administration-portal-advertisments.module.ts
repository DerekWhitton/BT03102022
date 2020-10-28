import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { AdvertisementsIndexComponent } from './containers/advertisements-index/advertisements-index.component';

export const administrationPortalAdvertismentsRoutes: Route[] = [];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: AdvertisementsIndexComponent },
    ]),
  ],
  declarations: [AdvertisementsIndexComponent],
  entryComponents: [AdvertisementsIndexComponent],
})
export class AdministrationPortalAdvertismentsModule {}
