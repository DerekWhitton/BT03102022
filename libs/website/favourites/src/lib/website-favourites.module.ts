import { UiModule } from '@bushtrade/ui';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FavouritesIndexComponent } from './container/favourites-index/favourites-index.component';
import { UiElementsModule } from '@bushtrade/ui-elements';

@NgModule({
  imports: [
    CommonModule,
    UiModule,
    UiElementsModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: FavouritesIndexComponent },
    ]),
  ],
  declarations: [FavouritesIndexComponent],
})
export class WebsiteFavouritesModule {}
