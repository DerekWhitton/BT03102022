import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { UiModule } from '@bushtrade/ui';
import { UiElementsModule } from '@bushtrade/ui-elements';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListingsIndexComponent } from './containers/listings/listings-index/listings-index.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromListings from './+state/listings/listings.reducer';
import { ListingsEffects } from './+state/listings/listings.effects';
import { ListingsFacade } from './+state/listings/listings.facade';
import { CategoriesIndexComponent } from './containers/categories/categories-index/categories-index.component';
import { CategoriesComponent } from './containers/categories/categories/categories.component';
import * as fromCategories from './+state/categories/categories.reducer';
import { CategoriesEffects } from './+state/categories/categories.effects';
import { CategoriesFacade } from './+state/categories/categories.facade';

export const administrationPortalListingsRoutes: Route[] = [];

@NgModule({
  imports: [
    CommonModule,
    UiModule,
    UiElementsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: ListingsIndexComponent },
      { path: 'categories', component: CategoriesIndexComponent },
    ]),
    StoreModule.forFeature(
      fromListings.LISTINGS_FEATURE_KEY,
      fromListings.reducer
    ),
    EffectsModule.forFeature([ListingsEffects]),
    StoreModule.forFeature(
      fromCategories.CATEGORIES_FEATURE_KEY,
      fromCategories.reducer
    ),
    EffectsModule.forFeature([CategoriesEffects]),
  ],
  declarations: [
    ListingsIndexComponent,
    CategoriesIndexComponent,
    CategoriesComponent,
  ],
  entryComponents: [ListingsIndexComponent],
  providers: [ListingsFacade, CategoriesFacade],
})
export class AdministrationPortalListingsModule {}
