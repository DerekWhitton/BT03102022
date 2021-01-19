import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SellingIndexComponent } from './container/selling-index/selling-index.component';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild([
      {path: '', pathMatch: 'full', component: SellingIndexComponent} 
    ]),
  ],
  declarations: [SellingIndexComponent],
})
export class WebsiteSellingModule {}
