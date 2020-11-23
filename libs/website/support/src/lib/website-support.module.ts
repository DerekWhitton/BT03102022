import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SupportIndexComponent } from './support-index/support-index.component';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: SupportIndexComponent },
    ]),
  ],
  declarations: [SupportIndexComponent],
})
export class WebsiteSupportModule {}
