import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'cateogry-block',
  templateUrl: './cateogry-block.component.html',
  styleUrls: ['./cateogry-block.component.scss']
})
export class CateogryBlockComponent implements OnInit {

  @Input() categories;  
  constructor() { }

  ngOnInit(): void {
  }

}
