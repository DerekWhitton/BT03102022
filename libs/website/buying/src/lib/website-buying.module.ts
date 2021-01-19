import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BuyingIndexComponent } from './container/buying-index/buying-index.component';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild([
       {path: '', pathMatch: 'full', component: BuyingIndexComponent} 
    ]),
  ],
  declarations: [BuyingIndexComponent],
})
export class WebsiteBuyingModule {}
