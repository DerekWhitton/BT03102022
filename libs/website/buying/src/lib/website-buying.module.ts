import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BuyingIndexComponent } from './container/buying-index/buying-index.component';
import { UiElementsModule } from '@bushtrade/ui-elements';

@NgModule({
  imports: [
    CommonModule,
    UiElementsModule,

    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: BuyingIndexComponent },
    ]),
  ],
  declarations: [BuyingIndexComponent],
})
export class WebsiteBuyingModule {}
