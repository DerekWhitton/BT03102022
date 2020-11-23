import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MegaMenuModule } from 'primeng/megamenu';
import { PortalMenuComponent } from './portal-menu/portal-menu.component';
import { CrudTableComponent } from './crud-table/crud-table.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { WebsiteMenuComponent } from './website-menu/website-menu.component';

@NgModule({
  imports: [CommonModule, MegaMenuModule],
  declarations: [
    PortalMenuComponent,
    CrudTableComponent,
    HeaderComponent,
    FooterComponent,
    WebsiteMenuComponent,
  ],
  exports: [
    PortalMenuComponent,
    CrudTableComponent,
    HeaderComponent,
    FooterComponent,
  ],
})
export class UiModule {}
