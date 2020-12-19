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
import { Observable } from 'rxjs';

@Component({
  selector: 'website-profile-index',
  templateUrl: './profile-index.component.html',
  styleUrls: ['./profile-index.component.scss'],
})
export class ProfileIndexComponent implements OnInit {
  user$: Observable<IUser>;
  sellers$: Observable<ISeller[]>;
  loaded$: Observable<boolean>;

  displayAddListingDialog: boolean = false;

  displayStartSellingDialog: boolean = false;

  signUpSellerFormGroup: FormGroup = new FormGroup({
    bank: new FormControl('', Validators.required),
    branchCode: new FormControl('', Validators.required),
    accountType: new FormControl('', Validators.required),
    accountNumber: new FormControl('', Validators.required),
    taxNumber: new FormControl('', Validators.required),
    ckNumber: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    isPrivateIndividual: new FormControl(true, Validators.required),
  });

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadUser());
    this.user$ = this.store.select(getUser);
    this.sellers$ = this.store.select(getUserSellers);
  }

  registerSeller() {
    this.store.dispatch(
      registerSeller({
        sellerProfile: this.signUpSellerFormGroup.value as ISeller,
      })
    );
    this.displayStartSellingDialog = false;
  }
}
