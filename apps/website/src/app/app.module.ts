import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WebsiteWebsiteAppModule } from '@bushtrade/website/website-app';
import { AppComponent } from './app.component';
import { from } from 'rxjs';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, WebsiteWebsiteAppModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
