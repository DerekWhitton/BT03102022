import { createSupportTicket, loadSupportTickets } from './../+state/support-tickets.actions';
import { Component, OnInit } from '@angular/core';
import { SupportTicketsFacade } from '../+state/support-tickets.facade';
import { ICreateSupportTicket } from '@bushtrade/website/shared/entites';

@Component({
  selector: 'bushtrade-web-support-index',
  templateUrl: './support-index.component.html',
  styleUrls: ['./support-index.component.scss'],
})
export class SupportIndexComponent implements OnInit {
  pageSize = 10;
  currentPage = 1;
  supportTickets$ = this.supportTicketsFacade.allSupportTickets$;
  nextPage$ = this.supportTicketsFacade.nextSupportTicketsPage$;
  previousPage$ = this.supportTicketsFacade.previousSupportTicketsPage$;
  loaded$ = this.supportTicketsFacade.loaded$;
  error$ = this.supportTicketsFacade.lastKnownError$;
  added$ = this.supportTicketsFacade.supportTicketAdded$;

  constructor(private supportTicketsFacade: SupportTicketsFacade) {}

  ngOnInit(): void {
    this.loadPage({page:1, perPage: 10})
  }

  loadPage(params: any) {
    this.currentPage = params.page;
    this.supportTicketsFacade.dispatch(
      loadSupportTickets(params)
    );
  }

  saveSupportTicket(supportTicket: any) {
    this.supportTicketsFacade.dispatch(
      createSupportTicket({ supportTicket: supportTicket as ICreateSupportTicket })
    );
  }
}
