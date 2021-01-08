import { Component, Input, OnInit } from '@angular/core';
import { IListing, ListingType } from '@bushtrade/website/shared/entites';

@Component({
  selector: 'bushtrade-web-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent implements OnInit {
  @Input() item: IListing;

  ListingType = ListingType;
  constructor() {}

  ngOnInit(): void {}
}
