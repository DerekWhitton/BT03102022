import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MegaMenuItem, MenuItem } from 'primeng/api';
import { CategoryService } from '@bushtrade/website/shared/services';
import { NavigationEnd, Router } from '@angular/router';
import { ICategory, ListingType } from '@bushtrade/website/shared/entites';
import { IUser } from '@bushtrade/website/shared/entites';
import { getUser, loadUser } from '@bushtrade/website/shared/state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
@Component({
  selector: 'bushtrade-web-menu',
  templateUrl: './website-menu.component.html',
  styleUrls: ['./website-menu.component.scss'],
})
export class WebsiteMenuComponent implements OnInit {
  @Input() loggedIn;
  menuItems: MegaMenuItem[];
  selectableListingTypes: any[];
  selectedListingType: ListingType;
  searchQuery: string;
  @Output() signIn = new EventEmitter();
  @Output() signOut = new EventEmitter();
  showMegaSearchMenu: boolean;
  showBuySellMenu: boolean = false;
  categories: ICategory[];

  user$: Observable<IUser>;

  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private store: Store
  ) {}

  ngOnInit(): void {

    this.store.dispatch(loadUser());
    this.user$ = this.store.select(getUser);

    this.router.events.subscribe((nEvent) => {
      if (nEvent instanceof NavigationEnd) this.showMegaSearchMenu = true; //!nEvent.url.startsWith('/listings');
    });

    this.categoryService.loadCategories().subscribe((categories) => {
      this.categories = categories;
    });

    this.selectableListingTypes = Object.keys(ListingType)
      .filter((s) => isNaN(Number(s)))
      .map((s) => {
        return { label: ListingType[s] == ListingType.Sale ? "For Sale": "Auctions", value: ListingType[s] };    
    });


    this.menuItems = [
      {
        label: 'Buy & Sell',
        command: () => this.showBuySell(),
      },

      // {
      //   label: 'Marketplace',
      //   command: (_) => {
      //     this.router.navigate(['/', 'listings'], {
      //       queryParams: { type: ListingType.Sale },
      //     });
      //   },
      // },
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
    ];

    if (this.loggedIn) {
      this.menuItems.push({
        label: 'Support',
        routerLink: ['/', 'support'],
      });
    }

    this.menuItems.push(
      {
        label: 'Blog',
        routerLink: ['/', 'blog'],
      },
      {
        icon: 'pi pi-fw pi-heart',
        routerLink: ['/', 'favourites'],
      }
    );
  }

  showBuySell() {
    this.showBuySellMenu = true;
  }

  login() {
    this.showBuySellMenu = false 
    this.signIn.emit();
  }

  logout() {
    this.signOut.emit();
  }

  showListings(categoryId = null, listingType = null): void {
    this.showBuySellMenu = false;
    this.router.navigate(['/', 'listings'], {
      queryParams: {
        type: listingType,
        categoryId: categoryId,
      },
    });
  }

  handleSearch() {
    let queryParams =
      this.selectedListingType || this.selectedListingType == 0
        ? { type: this.selectedListingType }
        : {};
    if (this.searchQuery && this.searchQuery.trim().length) {
      queryParams['q'] = this.searchQuery;
    }

    this.router.navigate(['/', 'listings'], {
      queryParams,
    });
  }
}
