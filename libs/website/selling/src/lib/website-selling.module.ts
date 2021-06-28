import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SellingIndexComponent } from './container/selling-index/selling-index.component';
import { UiElementsModule } from '@bushtrade/ui-elements';
@NgModule({
  imports: [
    CommonModule,
    UiElementsModule,

    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: SellingIndexComponent },
    ]),
  ],
  declarations: [SellingIndexComponent],
})
export class WebsiteSellingModule {}
