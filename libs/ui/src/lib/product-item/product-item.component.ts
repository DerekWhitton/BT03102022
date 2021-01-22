import { Component, Input, OnInit } from '@angular/core';
import { IListing, ListingType } from '@bushtrade/website/shared/entites';
import { ListingsService } from '@bushtrade/website/shared/services';

@Component({
  selector: 'bushtrade-web-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent implements OnInit {
  @Input() item: IListing;

  ListingType = ListingType;

  constructor(private listingsService: ListingsService) {}

  ngOnInit(): void {}
  updateUrl() {
    this.item.images[0].url = "https://place-hold.it/600x300&text=No%20Image%20Available";
  }
  
  toggleFavorite() {
    if (this.item.isFavorite) {
      this.listingsService.removeFavorite(this.item.id)
        .subscribe(
          () => {
            this.item.isFavorite = false;
          }
        );
    } else {
      this.listingsService.addFavorite(this.item.id)
        .subscribe(
        () => {
          this.item.isFavorite = true;
        }
      );
    }
  }
}
