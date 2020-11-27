import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FavouritesIndexComponent } from './favourites-index/favourites-index.component';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: FavouritesIndexComponent },
    ]),
  ],
  declarations: [FavouritesIndexComponent],
})
export class WebsiteFavouritesModule {}
