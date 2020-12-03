import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { SupportIndexComponent } from './containers/support-index/support-index.component';

export const administrationPortalSupportRoutes: Route[] = [];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: SupportIndexComponent },
    ]),
  ],
  declarations: [SupportIndexComponent],
  entryComponents: [SupportIndexComponent],
})
export class AdministrationPortalSupportModule {}