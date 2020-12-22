import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MegaMenuItem, MenuItem } from 'primeng/api';

@Component({
  selector: 'bushtrade-web-menu',
  templateUrl: './website-menu.component.html',
  styleUrls: ['./website-menu.component.scss'],
})


export class WebsiteMenuComponent implements OnInit {
  @Input() loggedIn;
  items: MegaMenuItem[];
  accountItems: MenuItem[];
  categories = [];
  display;

  @Output() signIn = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    this.categories = [
      { name: 'Guns', code: 'GNS', inactive: false },
      { name: 'Ammo', code: 'AMMO', inactive: true },
      { name: 'Camping', code: 'CPM', inactive: false },
      { name: 'Clothes', code: 'CLTH', inactive: true },
    ];

    this.accountItems = [
      {
        label: 'Profile',
        routerLink: ['/', 'profile'],
      },
    ];

    this.items = [
      // {
      //   label: 'Buy & Sell',
      //   routerLink: ['/', 'buy-sell'],
      // },
      
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
      // {
      //   label: 'Trophy Cabinet',
      //   routerLink: ['/', 'trophy-cabinet'],
      // },
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

  login() {
    this.signIn.emit();
  }
}
