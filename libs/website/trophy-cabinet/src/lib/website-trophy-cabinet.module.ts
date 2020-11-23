import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TrophyCabinetIndexComponent } from './container/trophy-cabinet-index/trophy-cabinet-index.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: TrophyCabinetIndexComponent },
    ]),
  ],
  declarations: [TrophyCabinetIndexComponent],
})
export class WebsiteTrophyCabinetModule {}
