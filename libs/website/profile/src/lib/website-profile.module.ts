import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Store, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromShared from '@bushtrade/website/shared/state';
import { ProfileIndexComponent } from './containers/profile-index/profile-index.component';
import { UiElementsModule } from '@bushtrade/ui-elements';
import { UiModule } from '@bushtrade/ui';
import { SellerIndexComponent } from './containers/seller-index/seller-index.component';
import * as fromListings from './+state/listings/listings.reducer';
import { ListingsEffects } from './+state/listings/listings.effects';
import { ListingsFacade } from './+state/listings/listings.facade';
import { UserComponent } from './containers/user/user.component';

@NgModule({
  imports: [
    CommonModule,
    UiElementsModule,
    FormsModule,
    ReactiveFormsModule,
    UiModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProfileIndexComponent,
        children: [
          { path: 'account', component: UserComponent },
          { path: 'listings', component: SellerIndexComponent },
        ],
      },
    ]),

    StoreModule.forFeature(fromShared.USER_FEATURE_KEY, fromShared.userReducer),
    EffectsModule.forFeature([fromShared.UserEffects]),
    StoreModule.forFeature(
      fromListings.LISTINGS_FEATURE_KEY,
      fromListings.reducer
    ),
    EffectsModule.forFeature([ListingsEffects]),
  ],
  declarations: [ProfileIndexComponent, SellerIndexComponent, UserComponent],
  providers: [ListingsFacade],
})
export class WebsiteProfileModule {}
