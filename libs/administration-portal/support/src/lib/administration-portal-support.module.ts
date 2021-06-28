import { UiModule } from '@bushtrade/ui';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { SupportIndexComponent } from './containers/support-index/support-index.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromSupportTickets from './+state/support-tickets.reducer';
import { SupportTicketsEffects } from './+state/support-tickets.effects';
import { SupportTicketsFacade } from './+state/support-tickets.facade';
import { UiElementsModule } from '@bushtrade/ui-elements';
import { SupportTicketDetailsComponent } from './support-ticket-details/support-ticket-details.component';

export const administrationPortalSupportRoutes: Route[] = [];

@NgModule({
  imports: [
    CommonModule,
    UiModule,
    UiElementsModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: SupportIndexComponent },
      { path: ':ticketId', component: SupportTicketDetailsComponent }
    ]),
    StoreModule.forFeature(
      fromSupportTickets.SUPPORTTICKETS_FEATURE_KEY,
      fromSupportTickets.reducer
    ),
    EffectsModule.forFeature([SupportTicketsEffects]),
  ],
  declarations: [
    SupportIndexComponent,
    SupportTicketDetailsComponent
  ],
  entryComponents: [SupportIndexComponent],
  providers: [SupportTicketsFacade],
})
export class AdministrationPortalSupportModule {}
