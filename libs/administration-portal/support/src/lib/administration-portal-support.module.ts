import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { SupportIndexComponent } from './support-index/support-index.component';

export const administrationPortalSupportRoutes: Route[] = [];

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [SupportIndexComponent],
  entryComponents: [SupportIndexComponent],
})
export class AdministrationPortalSupportModule {}
