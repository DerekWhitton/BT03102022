import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as fromSupportTickets from './support-tickets.reducer';
import * as SupportTicketsSelectors from './support-tickets.selectors';

@Injectable()
export class SupportTicketsFacade {
  loaded$ = this.store.pipe(select(SupportTicketsSelectors.getSupportTicketsLoaded));
  supportTicketAdded$ = this.store.pipe(select(SupportTicketsSelectors.getSupportTicketAdded));
  allSupportTickets$ = this.store.pipe(select(SupportTicketsSelectors.getAllSupportTickets));
  selectedSupportTicket$ = this.store.pipe(select(SupportTicketsSelectors.getSelected));
  lastKnownError$ = this.store.pipe(select(SupportTicketsSelectors.getSupportTicketsError));
  nextSupportTicketsPage$ = this.store.pipe(
    select(SupportTicketsSelectors.getNextSupportTicketsPageNumber)
  );
  previousSupportTicketsPage$ = this.store.pipe(
    select(SupportTicketsSelectors.getPreviousSupportTicketsPageNumber)
  );
  constructor(
    private store: Store<fromSupportTickets.SupportTicketsPartialState>
  ) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
