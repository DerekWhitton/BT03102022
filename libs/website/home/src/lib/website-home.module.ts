import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { HomeIndexComponent } from './home-index/home-index.component';
import { UiModule } from '@bushtrade/ui';

export const websiteHomeRoutes: Route[] = [];

@NgModule({
  imports: [
    CommonModule,
    UiModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: HomeIndexComponent },
    ]),
  ],
  declarations: [HomeIndexComponent],
})
export class WebsiteHomeModule {}
