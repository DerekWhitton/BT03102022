import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { HomeIndexComponent } from './home-index/home-index.component';
import { UiModule } from '@bushtrade/ui';
import { UiElementsModule } from '@bushtrade/ui-elements';

export const websiteHomeRoutes: Route[] = [];

@NgModule({
  imports: [
    CommonModule,
    UiModule,
    UiElementsModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: HomeIndexComponent },
    ]),
  ],
  declarations: [HomeIndexComponent],
})
export class WebsiteHomeModule {}
