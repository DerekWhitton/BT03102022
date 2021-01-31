import { createSupportTicket, loadSupportTickets } from './../+state/support-tickets.actions';
import { Component, OnInit } from '@angular/core';
import { SupportTicketsFacade } from '../+state/support-tickets.facade';
import { ICreateSupportTicket, SupportTicketCategory } from '@bushtrade/website/shared/entites';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'bushtrade-web-support-index',
  templateUrl: './support-index.component.html',
  styleUrls: ['./support-index.component.scss'],
})
export class SupportIndexComponent implements OnInit {
  private pageSize = 10;
  currentPage = 1;
  supportTickets$ = this.supportTicketsFacade.allSupportTickets$;
  nextPage$ = this.supportTicketsFacade.nextSupportTicketsPage$;
  previousPage$ = this.supportTicketsFacade.previousSupportTicketsPage$;
  loaded$ = this.supportTicketsFacade.loaded$;
  error$ = this.supportTicketsFacade.lastKnownError$;

  selectableTicketCategories: { label: string; value: SupportTicketCategory }[];
  filters = {
    category: null,
    query: null,
    includeClosed: null
  }
  showCreateSupportTicketModal = false;
  addSupportTicketFormGroup: FormGroup = new FormGroup({
    listing: new FormControl(''),
    title: new FormControl('', Validators.required),
    message: new FormControl('', [ Validators.required, Validators.maxLength(2500) ]),
    category: new FormControl('', Validators.required)
  });

  constructor(private supportTicketsFacade: SupportTicketsFacade) {}

  ngOnInit(): void {
    this.selectableTicketCategories = Object.keys(SupportTicketCategory)
      .filter(s => isNaN(Number(s)))
      .map(s => {
        return { label: s, value: SupportTicketCategory[s] };
      });
    this.loadPage(1);
  }

  loadPage(page: number) {
    this.currentPage = page;
    this.supportTicketsFacade.dispatch(
      loadSupportTickets({
        page,
        perPage: this.pageSize,
        query: this.filters.query,
        category: this.filters.category,
        includeClosed: this.filters.includeClosed,
      })
    );
  }

  applyFilters() {
    this.loadPage(1);
  }

  saveSupportTicket() {
    if (!this.addSupportTicketFormGroup.valid) {
      return;
    }
    this.supportTicketsFacade.dispatch(
      createSupportTicket({ supportTicket: this.addSupportTicketFormGroup.value as ICreateSupportTicket })
    );
    this.loadPage(this.currentPage);
    this.hideCreateSupportTicketModal();
  }

  hideCreateSupportTicketModal() {
    this.showCreateSupportTicketModal = false;
    this.addSupportTicketFormGroup.reset();
  }
}
