import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { WebsiteIndexComponent } from './website-index/website-index.component';

export const websiteWebsiteAppRoutes: Route[] = [];

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [WebsiteIndexComponent],
})
export class WebsiteWebsiteAppModule {}
