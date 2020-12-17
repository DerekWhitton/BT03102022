import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { SearchIndexComponent } from './search-index/search-index.component';
import { UiModule } from '@bushtrade/ui';
import { UiElementsModule } from '@bushtrade/ui-elements';

export const websiteSearchRoutes: Route[] = [];

@NgModule({
  imports: [CommonModule,
    UiModule,
    UiElementsModule, 
    RouterModule.forChild([
    { path: '', pathMatch: 'full', component: SearchIndexComponent },
  ]),],
  declarations: [SearchIndexComponent],
})
export class WebsiteSearchModule {}
