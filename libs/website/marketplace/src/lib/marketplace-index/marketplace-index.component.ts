import { Component, OnInit } from '@angular/core';
import { UserService } from '@bushtrade/website/shared/services';
@Component({
  selector: 'bushtrade-web-marketplace-index',
  templateUrl: './marketplace-index.component.html',
  styleUrls: ['./marketplace-index.component.scss'],
})
export class MarketplaceIndexComponent implements OnInit {
  constructor(public userService: UserService) {}

  ngOnInit(): void {
    console.log(this.userService.loggedIn());
  }
}
