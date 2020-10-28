import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { EscrowIndexComponent } from './containers/escrow-index/escrow-index.component';

export const administrationPortalEscrowRoutes: Route[] = [];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: EscrowIndexComponent },
    ]),
  ],
  declarations: [EscrowIndexComponent],
  entryComponents: [EscrowIndexComponent],
})
export class AdministrationPortalEscrowModule {}
