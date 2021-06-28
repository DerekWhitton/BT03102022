import { UiModule } from './../../../../ui/src/lib/ui.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SupportIndexComponent } from './support-index/support-index.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromSupportTickets from './+state/support-tickets.reducer';
import { SupportTicketsEffects } from './+state/support-tickets.effects';
import { SupportTicketsFacade } from './+state/support-tickets.facade';
import { UiElementsModule } from '@bushtrade/ui-elements';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SupportTicketDetailsComponent } from './support-ticket-details/support-ticket-details.component';

@NgModule({
  imports: [
    CommonModule,
    UiModule,
    UiElementsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: SupportIndexComponent },
      { path: ':ticketId', component: SupportTicketDetailsComponent },
    ]),

    StoreModule.forFeature(
      fromSupportTickets.SUPPORTTICKETS_FEATURE_KEY,
      fromSupportTickets.reducer
    ),

    EffectsModule.forFeature([SupportTicketsEffects]),
  ],
  declarations: [SupportIndexComponent, SupportTicketDetailsComponent],
  providers: [SupportTicketsFacade],
})
export class WebsiteSupportModule {}
