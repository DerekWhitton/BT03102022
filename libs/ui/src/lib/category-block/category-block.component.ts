import { Component, Input, OnInit } from '@angular/core';
import { ICategory } from '@bushtrade/website/shared/entites';

@Component({
  selector: 'category-block',
  templateUrl: './category-block.component.html',
  styleUrls: ['./category-block.component.scss'],
})
export class CategoryBlockComponent implements OnInit {
  @Input() categories: ICategory[];
  constructor() {}

  ngOnInit(): void {}
}
