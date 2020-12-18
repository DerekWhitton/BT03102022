import { Component, OnInit } from '@angular/core';
import { IUser } from '@bushtrade/website/shared/entites';
import { getUser, loadUser } from '@bushtrade/website/shared/state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'website-user-index',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  user$: Observable<IUser>;
  loaded$: Observable<boolean>;
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadUser());
    this.user$ = this.store.select(getUser);
  }
}
