import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { APP_CONFIG } from '@bushtrade/app-config';
import { MessageService } from 'primeng/api';
import { loadListings, markListingDeleted } from '../../../+state/listings/listings.actions';
import { ListingsFacade } from '../../../+state/listings/listings.facade';

@Component({
  selector: 'bushtrade-administration-listings-index',
  templateUrl: './listings-index.component.html',
  styleUrls: ['./listings-index.component.scss'],
})
export class ListingsIndexComponent implements OnInit {
  columns = [
    {
      field: 'isReported',
      header: '',
      converter: (val) => val ? this.sanitizer.bypassSecurityTrustHtml('<p class="p-tag p-tag-danger">Reported</p>') : ''
    },
    {
      field: 'name',
      header: 'Name',
      converter: (val) => `<p title="${val}">${val}</p>`
    },
    {
      field: 'description',
      header: 'Description',
      converter: (val) => `<p title="${val}">${val}</p>`
    },
    {
      field: 'createdAt',
      header: 'Date created',
      converter: (val) => this.datePipe.transform(val, 'dd MMM yyyy hh:mm'),
    },
    {
      field: 'isDeleted',
      header: 'Is Deleted?',
      converter: (val) => val ? 'Yes' : 'No'
    }
  ];
  lastListingError$ = this.listingsFacade.error$;
  listings$ = this.listingsFacade.allListings$;
  loading$ = this.listingsFacade.loaded$;
  nextPage$ = this.listingsFacade.nextPage$;
  previousPage$ = this.listingsFacade.previousPage$;
  deletionSuccessful$ = this.listingsFacade.deletionSuccessful$;
  currentPage = 1;
  nextPageValue = 1;
  previousPageValue = 1;
  onlyReported = false;
  includeDeleted = false;
  query: string;
  selectedListing: any;
  showDeleteListingModal = false;
  markListingDeletedFormGroup: FormGroup = new FormGroup({
    deleteReason: new FormControl('', Validators.required)
  });
  listingUrl = null;

  constructor(
    @Inject(APP_CONFIG) private configuration: any,
    private listingsFacade: ListingsFacade,
    private messageService: MessageService,
    private datePipe: DatePipe,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.listingsFacade.dispatch(loadListings({ page: this.nextPageValue, perPage: 25, onlyReported: this.onlyReported }))
    this.nextPage$.subscribe(value => {
      this.nextPageValue = value;
    });
    this.previousPage$.subscribe(value => {
      this.previousPageValue = value;
    });
    this.deletionSuccessful$.subscribe(status => {
      if (status !== null && status) {
        this.messageService.add({
          severity: 'success',
          detail: 'Listing successfully marked as deleted'
        });
        this.pageOrFilterAction();
      }
    });
    this.lastListingError$.subscribe((error) => {
      if (error) {
        this.messageService.add({
          severity: 'error',
          detail:
            typeof error?.error === 'string'
              ? error?.error
              : error?.error?.title,
        });
      }
    });
  }

  onViewSelection(data) {
    this.listingUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`${this.configuration.websiteUrl}/listings/${data.id}`);
  }

  closeListing() {
    this.listingUrl = null;
  }

  pageOrFilterAction(pageNumber?: number) {
    if (!pageNumber || pageNumber === this.currentPage) {
      // When no paging happening, we go back to page 1
      pageNumber = 1;
    }
    this.listingsFacade.dispatch(loadListings({ 
      page: pageNumber ?? this.currentPage,
      perPage: 25,
      query: this.query,
      onlyReported: this.onlyReported,
      includeDeleted: this.includeDeleted
    }));
    this.currentPage = pageNumber;
  }

  onListingMarkAsDeleted(event: any) {
    this.selectedListing = event;
    if (this.selectedListing.isDeleted) {
      this.messageService.add({
        severity: 'warn',
        detail: 'This listing is already deleted',
      });
    } else {
      this.showDeleteListingModal = true;
    }
  }

  markListingAsDeleted() {
    this.listingsFacade.dispatch(markListingDeleted({
      listingId: this.selectedListing.id,
      deleteReason: this.markListingDeletedFormGroup.controls['deleteReason'].value
    }));
    this.hideModal();
  }

  hideModal() {
    this.showDeleteListingModal = false;
    this.markListingDeletedFormGroup.reset();
  }
}
