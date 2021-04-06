import { Component } from '@angular/core';
import { environment } from '../environments/environment';

@Component({
  selector: 'bushtrade-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'seller-portal';

  constructor()
  {
    if (
      (window.location as any).protocol != 'https:' &&
      environment.enforceHttps
    ) {
      location.href = location.href.replace('http://', 'https://');
    }
  }
  

}


