import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'bushtrade-web-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent implements OnInit {
  @Input() item: any; // TODO: add type
  constructor() {}

  ngOnInit(): void {}
}
