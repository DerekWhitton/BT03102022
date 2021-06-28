import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ContactUsIndexComponent } from './container/contact-us-index/contact-us-index.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
       {path: '', pathMatch: 'full', component: ContactUsIndexComponent} 
    ]),
  ],
  declarations: [ContactUsIndexComponent],
})
export class WebsiteContactUsModule {}
