import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UiModule } from '@bushtrade/ui';
import { UiElementsModule } from '@bushtrade/ui-elements';
import * as fromShared from '@bushtrade/website/shared/state';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ListingsEffects } from './+state/listings/listings.effects';
import { ListingsFacade } from './+state/listings/listings.facade';
import * as fromListings from './+state/listings/listings.reducer';
import { PurchasesEffects } from './+state/purchases/purchases.effects';
import { PurchasesFacade } from './+state/purchases/purchases.facade';
import * as fromPurchases from './+state/purchases/purchases.reducer';
import { ProfileIndexComponent } from './containers/profile-index/profile-index.component';
import { PurchasesIndexComponent } from './containers/purchases-index/purchases-index.component';
import { SellerIndexComponent } from './containers/seller-index/seller-index.component';
import { UserComponent } from './containers/user/user.component';
import { PremiumPackageModalComponent } from './containers/premium-package-modal/premium-package-modal.component';
import { MessagesIndexComponent } from './containers/messages-index/messages-index.component';

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
          { path: 'purchases', component: PurchasesIndexComponent },
          { path: 'messages', component: MessagesIndexComponent },
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
    StoreModule.forFeature(
      fromPurchases.PURCHASES_FEATURE_KEY,
      fromPurchases.reducer
    ),
    EffectsModule.forFeature([PurchasesEffects]),
  ],
  declarations: [
    ProfileIndexComponent,
    SellerIndexComponent,
    UserComponent,
    PurchasesIndexComponent,
    PremiumPackageModalComponent,
    MessagesIndexComponent,
  ],
  providers: [ListingsFacade, PurchasesFacade],
})
export class WebsiteProfileModule {}
