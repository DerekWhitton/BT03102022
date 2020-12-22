import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiElementsModule } from '@bushtrade/ui-elements';

import { PortalMenuComponent } from './portal-menu/portal-menu.component';
import { CrudTableComponent } from './crud-table/crud-table.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { WebsiteMenuComponent } from './website-menu/website-menu.component';
import { PortalFooterComponent } from './portal-footer/portal-footer.component';
import { PortalMenuItemComponent } from './portal-menu-item/portal-menu-item.component';
import { PortalTopBarComponent } from './portal-top-bar/portal-top-bar.component';
import { ProgressSpinnerComponent } from './progress-spinner/progress-spinner.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { WebsiteFooterComponent } from './website-footer/website-footer.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { ProductItemMinimalComponent } from './product-item-minimal/product-item-minimal.component';
import { CarouselListingItemComponent } from './carousel-listing-item/carousel-listing-item.component';
import { CarouselHeroBannerComponent } from './carousel-hero-banner/carousel-hero-banner.component';
import { CateogryBlockComponent } from './cateogry-block/cateogry-block.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, UiElementsModule],
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
    ProgressSpinnerComponent,
    CarouselListingItemComponent,
    CarouselHeroBannerComponent,
    CateogryBlockComponent,
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
    ProgressSpinnerComponent,
    CarouselHeroBannerComponent,
    CarouselListingItemComponent,
    CateogryBlockComponent
  ],
})
export class UiModule {}
