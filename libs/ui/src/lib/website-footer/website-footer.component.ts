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

    var scriptUrl = 'https://js.createsend1.com/javascript/copypastesubscribeformlogic.js';
    let node = document.createElement('script');
    node.src = scriptUrl;
    node.type = 'text/javascript';
    node.async = true;
    node.charset = 'utf-8';
    document.getElementsByTagName('head')[0].appendChild(node);

  }

  login() {
    this.signIn.emit();
  }

  
}
