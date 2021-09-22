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
  imageThumbnailUrl: string;

  ListingType = ListingType;

  todayNumber: number = Date.now();

  constructor(private listingsService: ListingsService) {}

  ngOnInit(): void {
    this.imageThumbnailUrl = this.item.images[0]?.sizes.filter(
      (x) => x.width === 150
    ).length
      ? this.item.images[0]?.sizes.filter((x) => x.width === 150)[0].imageUrl
      : this.item.images[0]?.imageUrl;
  }

  updateUrl() {
    this.item.images[0].imageUrl = '/assets/layout/images/logo-light.png';
  }

  toggleFavorite() {
    if (this.item.isFavorite) {
      this.listingsService.removeFavorite(this.item.id).subscribe(() => {
        this.item.isFavorite = false;
      });
    } else {
      this.listingsService.addFavorite(this.item.id).subscribe(() => {
        this.item.isFavorite = true;
      });
    }
  }
}
