import { Component, Input, OnInit } from '@angular/core';
import { MegaMenuItem } from 'primeng/api';

@Component({
  selector: 'bushtrade-web-portal-menu',
  templateUrl: './portal-menu.component.html',
  styleUrls: ['./portal-menu.component.scss'],
})
export class PortalMenuComponent implements OnInit {
  @Input() menuItems: MegaMenuItem[];
  constructor() {}

  ngOnInit(): void {}
}
