import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardIndexComponent } from './containers/dashboard-index/dashboard-index.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: DashboardIndexComponent },
    ]),
  ],
  declarations: [DashboardIndexComponent],
  entryComponents: [DashboardIndexComponent],
})
export class SellerPortalDashboardModule {}
