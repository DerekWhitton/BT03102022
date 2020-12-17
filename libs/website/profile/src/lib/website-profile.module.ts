import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { ProfileIndexComponent } from './containers/profile-index/profile-index.component';

export const websiteProfileRoutes: Route[] = [];

@NgModule({
  imports: [CommonModule, 
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: ProfileIndexComponent },
    ]),],
  declarations: [ProfileIndexComponent],
})
export class WebsiteProfileModule {}
