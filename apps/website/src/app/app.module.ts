import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { WebsiteWebsiteAppModule } from '@bushtrade/website/website-app';
import { AppComponent } from './app.component';
import { from } from 'rxjs';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, WebsiteWebsiteAppModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
