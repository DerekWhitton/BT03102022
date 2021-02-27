import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { BreadcrumbService } from '../shared/services/breadcrumb.service';
@Component({
  selector: 'bushtrade-portal-top-bar',
  templateUrl: './portal-top-bar.component.html',
  styleUrls: ['./portal-top-bar.component.scss'],
})
export class PortalTopBarComponent implements OnDestroy {
  @Input() topbarNotificationMenuActive;
  @Input() topbarUserMenuActive;

  @Output() handleMenuButtonClick = new EventEmitter();
  @Output() handleTopbarUserMenuButtonClick = new EventEmitter();

  subscription: Subscription;

  items: MenuItem[];

  constructor(public breadcrumbService: BreadcrumbService) {
    this.subscription = breadcrumbService.itemsHandler.subscribe((response) => {
      this.items = response;
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
