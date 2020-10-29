import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { HomeIndexComponent } from './home-index/home-index.component';

export const websiteHomeRoutes: Route[] = [];

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [HomeIndexComponent],
})
export class WebsiteHomeModule {}
