import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardIndexComponent } from './containers/dashboard-index/dashboard-index.component';

@NgModule({
  imports: [CommonModule],
  declarations: [DashboardIndexComponent],
  entryComponents: [DashboardIndexComponent],
})
export class SellerPortalDashboardModule {}
