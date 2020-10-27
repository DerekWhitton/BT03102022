import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalMenuComponent } from './portal-menu/portal-menu.component';
import { CrudTableComponent } from './crud-table/crud-table.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ProductItemComponent } from './product-item/product-item.component';

@NgModule({
  imports: [CommonModule],
  declarations: [PortalMenuComponent, CrudTableComponent, HeaderComponent, FooterComponent, ProductItemComponent],
})
export class UiModule {}
