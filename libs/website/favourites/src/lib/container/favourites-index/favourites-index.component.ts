import { MsalService } from '@azure/msal-angular';
import {
  IDynamicListing,
  IListing,
  ListingType,
} from '@bushtrade/website/shared/entites';
import { MessageService } from 'primeng/api';
import { ListingsService } from '@bushtrade/website/shared/services';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bushtrade-web-favourites-index',
  templateUrl: './favourites-index.component.html',
  styleUrls: ['./favourites-index.component.scss'],
})
export class FavouritesIndexComponent implements OnInit {
  loggedIn = false;
  listingType = ListingType;
  selectableListingTypes: any[];
  favouriteListings: IDynamicListing[];
  selectedListingType: ListingType;
  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5,
    },
    {
      breakpoint: '768px',
      numVisible: 3,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
    },
  ];

  constructor(
    private listingService: ListingsService,
    private messageService: MessageService,
    private msalSvc: MsalService
  ) {}

  ngOnInit(): void {
    if (
      this.msalSvc.instance.getAllAccounts() &&
      this.msalSvc.instance.getAllAccounts().length
    ) {
      this.loggedIn = true;
    }

    this.selectableListingTypes = Object.keys(ListingType)
      .filter((s) => isNaN(Number(s)))
      .map((s) => {
        return { label: s, value: ListingType[s] };
      });
    this.selectedListingType = ListingType.Auction;
    this.selectableListingTypes.push({ label: 'All', value: '' });
    this.selectedListingType = this.selectableListingTypes[
      this.selectableListingTypes.length - 1
    ].value;
    this.loadFavorites();
  }

  removeFavourite(listingId: string) {
    this.listingService.removeFavorite(listingId).subscribe(
      (res) => {
        this.favouriteListings = this.favouriteListings.filter(
          (l) => l.id != listingId
        );
        this.messageService.add({
          severity: 'success',
          detail: 'Listing removed',
        });
      },
      () => {
        this.messageService.add({
          severity: 'error',
          detail: 'There was an error removing listing from favourites',
        });
      }
    );
  }

  loadFavorites() {
    this.listingService.getFavorites(this.selectedListingType).subscribe(
      (res) => {
        this.favouriteListings = res.map(
          (listing) =>
            <IDynamicListing>{
              ...listing,
              images:
                listing.images.length > 0
                  ? listing.images
                  : [
                      {
                        url:
                          'https://place-hold.it/800x700&text=No%20Image%20Available',
                      },
                    ],
              timeRemaining: 1,
            }
        );
      },
      () => {
        this.messageService.add({
          severity: 'error',
          detail: 'There was an error loading your favourite listings',
        });
      }
    );
  }
}
