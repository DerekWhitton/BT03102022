import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'bushtrade-web-index',
  templateUrl: './website-index.component.html',
  styleUrls: ['./website-index.component.scss'],
})
export class WebsiteIndexComponent implements OnInit {
  @Input() loggedIn;
  @Output() loginEmit = new EventEmitter();
  @Output() logoutEmit = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  login() {
    this.loginEmit.emit();
  }
  logout() {
    this.logoutEmit.emit();
  }
}
