import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AdministrationPortalAdministrationAppModule } from '@bushtrade/administration/app';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AdministrationPortalAdministrationAppModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
