import { closeSupportTicket, createSupportTicketMessage, loadSupportTicketDetails, setSelectedTicket } from './../+state/support-tickets.actions';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SupportTicketsFacade } from '../+state/support-tickets.facade';

@Component({
  selector: 'bushtrade-web-support-ticket-details',
  templateUrl: './support-ticket-details.component.html',
  styleUrls: ['./support-ticket-details.component.scss']
})
export class SupportTicketDetailsComponent implements OnInit {
  selectedSupportTicket$ = this.supportTicketsFacade.selectedSupportTicket$;

  constructor(
    private route: ActivatedRoute,
    private supportTicketsFacade: SupportTicketsFacade
  ) { }

  ngOnInit(): void {
    var params = this.route.snapshot.params;

    this.supportTicketsFacade.dispatch(
      setSelectedTicket({ id: params.ticketId })
    );
    this.supportTicketsFacade.dispatch(
      loadSupportTicketDetails({ ticketId: params.ticketId })
    );
  }

  addTicketMessage(message: string) {
    this.supportTicketsFacade.dispatch(
      createSupportTicketMessage({ supportTicketMessage: message })
    );
  }

  closeTicket(ticketId: string) {
    this.supportTicketsFacade.dispatch(
      closeSupportTicket({ ticketId })
    );
  }
}
