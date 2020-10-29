import { Component, OnInit } from '@angular/core';
import { MegaMenuItem } from 'primeng/api';

@Component({
  selector: 'bushtrade-seller-portal-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  menuItems: MegaMenuItem[];
  constructor() {}

  ngOnInit(): void {
    this.menuItems = [
      {
        label: 'Dashboard',
        icon: 'pi pi-pw pi-chart-bar',
        routerLink: ['/', '/'],
      },
      {
        label: 'Account',
        icon: 'pi pi-pw pi-cog',
        routerLink: ['/', 'account'],
      },
      {
        label: 'Banking',
        icon: 'pi pi-pw pi-envelope',
        routerLink: ['/', 'banking'],
      },
      {
        label: 'Buyers',
        icon: 'pi pi-pw pi-table',
        routerLink: ['/', 'buyers'],
      },
      {
        label: 'Listings',
        icon: 'pi pi-pw pi-shopping-cart',
        routerLink: ['/', 'listings'],
      },
      {
        label: 'Messages',
        icon: 'pi pi-pw pi-user',
        routerLink: ['/', 'messages'],
      },
      {
        label: 'Sales',
        icon: 'pi pi-pw pi-comments',
        routerLink: ['/', 'sales'],
      },
    ];
  }
}
