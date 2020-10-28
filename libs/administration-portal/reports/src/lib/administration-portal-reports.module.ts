import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { ReportsIndexComponent } from './containers/reports-index/reports-index.component';

export const administrationPortalReportsRoutes: Route[] = [];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: ReportsIndexComponent },
    ]),
  ],
  declarations: [ReportsIndexComponent],
  entryComponents: [ReportsIndexComponent],
})
export class AdministrationPortalReportsModule {}
