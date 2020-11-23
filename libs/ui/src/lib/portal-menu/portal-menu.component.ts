import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MegaMenuItem } from 'primeng/api';

@Component({
  selector: 'bushtrade-portal-menu',
  templateUrl: './portal-menu.component.html',
  styleUrls: ['./portal-menu.component.scss'],
})
export class PortalMenuComponent implements OnInit {
  @Input() menuItems;

  @Input() isSlim = false;

  @Input() isMobile = false;

  @Input() isDesktop = false;

  @Input() isMenuHoverActive = false;
  @Output() handleMenuClick = new EventEmitter();

  @Output() handleMenuHoverActive = new EventEmitter();
  @Output() handleMenuHoverActiveFalse = new EventEmitter();
  @Output() handleUnblockBodyScroll = new EventEmitter();
  @Output() handleStaticMenuMobileActiveFalse = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    console.log(this.menuItems);
  }

  handleSetMenuHoverActive() {
    this.handleMenuHoverActive.emit();
  }

  handleSetMenuHoverActiveFalse() {
    this.handleMenuHoverActiveFalse.emit();
  }

  unblockBodyScroll() {
    this.handleUnblockBodyScroll.emit();
  }

  staticMenuMobileActiveFalse() {
    this.handleStaticMenuMobileActiveFalse.emit();
  }
}
