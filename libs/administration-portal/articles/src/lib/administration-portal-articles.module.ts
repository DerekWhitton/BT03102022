import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { ArticlesIndexComponent } from './containers/articles-index/articles-index.component';

export const administrationPortalArticlesRoutes: Route[] = [];

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [ArticlesIndexComponent],
  entryComponents: [ArticlesIndexComponent],
})
export class AdministrationPortalArticlesModule {}
