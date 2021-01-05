import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiElementsModule } from '@bushtrade/ui-elements';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CarouselHeroBannerComponent } from './carousel-hero-banner/carousel-hero-banner.component';
import { CarouselListingItemComponent } from './carousel-listing-item/carousel-listing-item.component';
import { CateogryBlockComponent } from './cateogry-block/cateogry-block.component';
import { CrudTableComponent } from './crud-table/crud-table.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { PortalFooterComponent } from './portal-footer/portal-footer.component';
import { PortalMenuItemComponent } from './portal-menu-item/portal-menu-item.component';
import { PortalMenuComponent } from './portal-menu/portal-menu.component';
import { PortalTopBarComponent } from './portal-top-bar/portal-top-bar.component';
import { ProductItemMinimalComponent } from './product-item-minimal/product-item-minimal.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { ProgressSpinnerComponent } from './progress-spinner/progress-spinner.component';
import { SafeHtmlPipe } from './shared/pipes/safe-html.pipe';
import { WebsiteFooterComponent } from './website-footer/website-footer.component';
import { WebsiteMenuComponent } from './website-menu/website-menu.component';

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
    SafeHtmlPipe,
  ],
  providers: [MessageService, ConfirmationService],
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
    CateogryBlockComponent,
    SafeHtmlPipe,
  ],
})
export class UiModule {}
