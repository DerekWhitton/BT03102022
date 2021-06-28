import { Component, OnInit } from '@angular/core';
import { loadSupportTickets } from '../../+state/support-tickets.actions';
import { SupportTicketsFacade } from '../../+state/support-tickets.facade';

@Component({
  selector: 'bushtrade-administration-support-index',
  templateUrl: './support-index.component.html',
  styleUrls: ['./support-index.component.scss']
})
export class SupportIndexComponent implements OnInit {
  pageSize = 10;
  currentPage = 1;
  supportTickets$ = this.supportTicketsFacade.allSupportTickets$;
  nextPage$ = this.supportTicketsFacade.nextSupportTicketsPage$;
  previousPage$ = this.supportTicketsFacade.previousSupportTicketsPage$;
  loaded$ = this.supportTicketsFacade.loaded$;
  error$ = this.supportTicketsFacade.lastKnownError$;

  constructor(private supportTicketsFacade: SupportTicketsFacade) { }
  
  ngOnInit(): void {
    this.loadPage({page:1, perPage: 10});
  }

  loadPage(params: any) {
    this.currentPage = params.page;
    this.supportTicketsFacade.dispatch(
      loadSupportTickets(params)
    );
  }
}
