import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { IListing, ListingType } from '@bushtrade/website/shared/entites';

@Component({
  selector: 'carousel-listing-item',
  templateUrl: './carousel-listing-item.component.html',
  styleUrls: ['./carousel-listing-item.component.scss'],
})
export class CarouselListingItemComponent implements OnInit, OnChanges {
  listingTypes = ListingType;
  @Input() listings: any[];
  processedlistings: any[];
  responsiveOptions;

  constructor() {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3,
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2,
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.listings) {
      this.processedlistings = this.listings.map((listing) => {
        var parsedDate = this.parseCreatedTime(listing.createdAt);
        return {
          ...listing,
          timeAgoCreated: parsedDate,
        };
      });
    }
  }

  ngOnInit(): void {}

  parseCreatedTime(createdDate) {
    var timeDifference = new Date().getTime() - new Date(createdDate).getTime();
    var daysAgo = Math.floor(timeDifference / 86400000);
    switch(daysAgo) {
      case 0: return 'today';
      case 1: return 'yesterday';
      default: return `${daysAgo} days ago`;
    }
  }
}
