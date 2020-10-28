import { Component, OnInit } from '@angular/core';
import { MegaMenuItem } from 'primeng/api';

@Component({
  selector: 'bushtrade-aministration-app',
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
        label: 'Users',
        icon: 'pi pi-pw pi-cog',
        routerLink: ['/', 'users'],
      },
      {
        label: 'Advertisments',
        icon: 'pi pi-pw pi-envelope',
        routerLink: ['/', 'advertisments'],
      },
      {
        label: 'Articles',
        icon: 'pi pi-pw pi-table',
        routerLink: ['/', 'articles'],
      },
      {
        label: 'Escrow',
        icon: 'pi pi-pw pi-shopping-cart',
        routerLink: ['/', 'escrow'],
      },
      {
        label: 'Forums',
        icon: 'pi pi-pw pi-user',
        routerLink: ['/', 'forums'],
      },
      {
        label: 'Listings',
        icon: 'pi pi-pw pi-comments',
        routerLink: ['/', 'listings'],
      },
      {
        label: 'Messages',
        icon: 'pi pi-pw pi-calendar',
        routerLink: ['/', 'messages'],
      },
      {
        label: 'Reports',
        icon: 'pi pi-pw pi-globe',
        routerLink: ['/', 'reports'],
      },
      {
        label: 'Support',
        icon: 'pi pi-pw pi-cog',
        routerLink: ['/', 'support'],
      },
    ];
  }
}
