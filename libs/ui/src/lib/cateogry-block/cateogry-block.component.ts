import { Component, Input, OnInit } from '@angular/core';
import { ICategory } from '@bushtrade/website/shared/entites';

@Component({
  selector: 'cateogry-block',
  templateUrl: './cateogry-block.component.html',
  styleUrls: ['./cateogry-block.component.scss'],
})
export class CateogryBlockComponent implements OnInit {
  @Input() categories: ICategory[];
  constructor() {}

  ngOnInit(): void {}
}
