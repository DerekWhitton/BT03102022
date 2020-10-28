import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { ListingsIndexComponent } from './containers/listings-index/listings-index.component';

export const administrationPortalListingsRoutes: Route[] = [];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: ListingsIndexComponent },
    ]),
  ],
  declarations: [ListingsIndexComponent],
  entryComponents: [ListingsIndexComponent],
})
export class AdministrationPortalListingsModule {}
