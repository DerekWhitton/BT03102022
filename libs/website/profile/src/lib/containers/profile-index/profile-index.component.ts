import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IListing, ISeller, IUser } from '@bushtrade/website/shared/entites';
import {
  getUser,
  getUserSellers,
  loadUser,
  registerSeller,
} from '@bushtrade/website/shared/state';
import { Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { Observable } from 'rxjs';

@Component({
  selector: 'website-profile-index',
  templateUrl: './profile-index.component.html',
  styleUrls: ['./profile-index.component.scss'],
})
export class ProfileIndexComponent implements OnInit {
  items: MenuItem[];

  user$: Observable<IUser>;

  loaded$: Observable<boolean>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.items = [
      {
        label: 'Account',
        icon: 'pi pi-pw pi-user-edit',
        routerLink: 'account',
      },
      {
        label: 'Listing Profiles',
        icon: 'pi pi-fw pi-list',
        routerLink: 'listings',
      },
      {
        label: 'Purchases',
        icon: 'pi pi-fw pi-dollar',
        routerLink: 'purchases',
      },
    ];
    this.store.dispatch(loadUser());
  }
}
