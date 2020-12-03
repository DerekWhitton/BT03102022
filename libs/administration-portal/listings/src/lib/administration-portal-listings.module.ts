import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { UiModule } from '@bushtrade/ui';
import { ListingsIndexComponent } from './containers/listings/listings-index/listings-index.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromListings from './+state/listings/listings.reducer';
import { ListingsEffects } from './+state/listings/listings.effects';
import { ListingsFacade } from './+state/listings/listings.facade';

export const administrationPortalListingsRoutes: Route[] = [];

@NgModule({
  imports: [
    CommonModule,
    UiModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: ListingsIndexComponent },
    ]),
    StoreModule.forFeature(
      fromListings.LISTINGS_FEATURE_KEY,
      fromListings.reducer
    ),
    EffectsModule.forFeature([ListingsEffects]),
  ],
  declarations: [ListingsIndexComponent],
  entryComponents: [ListingsIndexComponent],
  providers: [ListingsFacade],
})
export class AdministrationPortalListingsModule {}
