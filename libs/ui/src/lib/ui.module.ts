import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MegaMenuModule } from 'primeng/megamenu';
import { MenuModule } from 'primeng/menu';
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
import { ProductItemComponent } from './product-item/product-item.component';
import { ProductItemMinimalComponent } from './product-item-minimal/product-item-minimal.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  imports: [
    CommonModule,
    MegaMenuModule,
    MenuModule,
    CardModule,
    ButtonModule,
    DropdownModule,
    InputTextModule,
  ],
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
    ProductItemComponent,
    ProductItemMinimalComponent,
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
    ProductItemComponent,
    ProductItemMinimalComponent,
  ],
})
export class UiModule {}
