import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { ArticlesIndexComponent } from './containers/articles-index/articles-index.component';

export const administrationPortalArticlesRoutes: Route[] = [];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: ArticlesIndexComponent },
    ]),
  ],
  declarations: [ArticlesIndexComponent],
  entryComponents: [ArticlesIndexComponent],
})
export class AdministrationPortalArticlesModule {}
