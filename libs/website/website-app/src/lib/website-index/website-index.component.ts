import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'bushtrade-web-index',
  templateUrl: './website-index.component.html',
  styleUrls: ['./website-index.component.scss'],
})
export class WebsiteIndexComponent implements OnInit {
  @Output() loginEmit = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  login() {
    this.loginEmit.emit();
  }
}
