import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MegaMenuModule } from 'primeng/megamenu';
import { PortalMenuComponent } from './portal-menu/portal-menu.component';
import { CrudTableComponent } from './crud-table/crud-table.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { WebsiteMenuComponent } from './website-menu/website-menu.component';
import { PortalFooterComponent } from './portal-footer/portal-footer.component';
import { PortalMenuItemComponent } from './portal-menu-item/portal-menu-item.component';
import { PortalTopBarComponent } from './portal-top-bar/portal-top-bar.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { WebsiteFooterComponent } from './website-footer/website-footer.component';

@NgModule({
  imports: [CommonModule, MegaMenuModule],
  declarations: [
    PortalMenuComponent,
    CrudTableComponent,
    HeaderComponent,
    FooterComponent,
    WebsiteMenuComponent,
    PortalFooterComponent,
    PortalMenuItemComponent,
    PortalTopBarComponent,
    WebsiteFooterComponent,
  ],
  providers: [
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: ExceptionInterceptor,
    //   multi: true,
    // },
    MessageService,
    ConfirmationService,
  ],
  exports: [
    PortalMenuComponent,
    CrudTableComponent,
    HeaderComponent,
    FooterComponent,
    WebsiteMenuComponent,
    PortalFooterComponent,
    PortalMenuItemComponent,
    PortalTopBarComponent,
    WebsiteFooterComponent,
  ],
})
export class UiModule {}
