import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MegaMenuItem, MenuItem } from 'primeng/api';
import { CategoryService } from '@bushtrade/website/shared/services';
import { NavigationEnd, Router } from '@angular/router';
import { ListingType } from '@bushtrade/website/shared/entites';

@Component({
  selector: 'bushtrade-web-menu',
  templateUrl: './website-menu.component.html',
  styleUrls: ['./website-menu.component.scss'],
})
export class WebsiteMenuComponent implements OnInit {
  @Input() loggedIn;
  items: MegaMenuItem[];
  accountItems: MenuItem[];
  searchCategories = [];
  selectedSearchCategory: string;
  searchQuery: string;
  @Output() signIn = new EventEmitter();
  showMegaSearchMenu: boolean;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((nEvent) => {
      if (nEvent instanceof NavigationEnd)
        this.showMegaSearchMenu = true; //!nEvent.url.startsWith('/listings');
    });

    this.searchCategories = [
      { name: 'Marketplace', inactive: false },
      { name: 'Auctions', inactive: false },
    ];

    this.accountItems = [
      {
        label: 'Profile',
        routerLink: ['/', 'profile', 'account'],
      },
    ];

    this.items = [
      {
        label: 'Buy & Sell',
        routerLink: ['/', 'buy-sell'],
      },

      {
        label: 'Marketplace',
        command: (_) => {
          this.router.navigate(['/', 'listings'], {
            queryParams: { type: ListingType.Sale },
          });
        },
      },
      {
        label: 'Auctions',
        command: (_) => {
          this.router.navigate(['/', 'listings'], {
            queryParams: { type: ListingType.Auction },
          });
        },
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
        label: 'Blog',
        routerLink: ['/', 'blog'],
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

  handleSearch() {

    let marketType =
      this.selectedSearchCategory['name'] == 'Marketplace'
        ? ListingType.Sale
        : ListingType.Auction;

    let queryParams = { type: marketType };
    if (this.searchQuery && this.searchQuery.trim().length) {
      queryParams['q'] = this.searchQuery;
    }

    this.router.navigate(['/', 'listings'], {
      queryParams,
    });
  }
}
