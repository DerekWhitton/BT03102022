import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'bushtrade-web-footer',
  templateUrl: './website-footer.component.html',
  styleUrls: ['./website-footer.component.scss']
})
export class WebsiteFooterComponent implements OnInit {
  @Input() loggedIn;
  @Output() signIn = new EventEmitter();
  
  constructor() { }

  ngOnInit(): void {
  }

  login() {
    this.signIn.emit();
  }

}
