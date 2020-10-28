import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { UiModule } from '@bushtrade/ui';
@NgModule({
  imports: [
    CommonModule,
    UiModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: IndexComponent },
    ]),
  ],
  declarations: [IndexComponent],
  entryComponents: [IndexComponent],
  exports: [IndexComponent],
})
export class AdministrationPortalAdministrationAppModule {}
