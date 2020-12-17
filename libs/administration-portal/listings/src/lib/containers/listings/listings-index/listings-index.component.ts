import { Component, OnInit } from '@angular/core';
import { ListingsFacade } from '../../../+state/listings/listings.facade';

@Component({
  selector: 'bushtrade-administration-listings-index',
  templateUrl: './listings-index.component.html',
  styleUrls: ['./listings-index.component.scss'],
})
export class ListingsIndexComponent implements OnInit {
  columns = [
    { field: 'name', header: 'Name' },
    { field: 'description', header: 'Description' },
  ];
  listings$ = this.listingsFacade.allListings$;
  loading$ = this.listingsFacade.loaded$;

  constructor(private listingsFacade: ListingsFacade) {}

  ngOnInit(): void {}
  onViewSelection(data) {}
}
