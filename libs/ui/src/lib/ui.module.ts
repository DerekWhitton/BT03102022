import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalMenuComponent } from './portal-menu/portal-menu.component';
import { CrudTableComponent } from './crud-table/crud-table.component';

@NgModule({
  imports: [CommonModule],
  declarations: [PortalMenuComponent, CrudTableComponent],
})
export class UiModule {}
