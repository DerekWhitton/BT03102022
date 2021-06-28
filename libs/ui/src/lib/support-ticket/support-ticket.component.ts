import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'bushtrade-web-support-ticket',
  templateUrl: './support-ticket.component.html',
  styleUrls: ['./support-ticket.component.scss']
})
export class SupportTicketComponent implements OnInit {
  @Input() supportTicket;
  @Input() isAdmin;
  @Output() addMessage = new EventEmitter<string>();
  @Output() closeTicket = new EventEmitter<string>();
  comment: string;

  constructor() { }

  ngOnInit(): void { }

  addTicketMessage() {
    this.addMessage.emit(this.comment);
    this.comment = null;
  }

  closeCurrentTicket() {
    this.closeTicket.emit(this.supportTicket.id);
  }
}
