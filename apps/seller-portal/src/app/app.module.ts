import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SellerPortalSellerAppModule } from '@bushtrade/seller-portal/app';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, SellerPortalSellerAppModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
