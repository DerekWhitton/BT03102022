import { Component, OnInit } from '@angular/core';
import { MegaMenuItem } from 'primeng/api';

@Component({
  selector: 'bushtrade-web-menu',
  templateUrl: './website-menu.component.html',
  styleUrls: ['./website-menu.component.scss'],
})
export class WebsiteMenuComponent implements OnInit {
  items: MegaMenuItem[];
  constructor() {}

  ngOnInit(): void {
    this.items = [
      {
        label: 'Buy & Sell',
        routerLink: ['/', 'buy-sell'],
      },
      {
        label: 'Marketplace',
        routerLink: ['/', 'marketplace'],
      },
      {
        label: 'Auctions',
        routerLink: ['/', 'auctions'],
      },
      {
        label: 'Forums',
        routerLink: ['/', 'forums'],
      },
      {
        label: 'Trophy Cabinet',
        routerLink: ['/', 'trophy-cabinet'],
      },
      {
        label: 'Support',
        routerLink: ['/', 'support'],
      },
      {
        icon: 'pi pi-fw pi-heart',
        routerLink: ['/', 'favourites'],
      },
    ];
  }
}
