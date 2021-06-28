import { CategoryService } from './../../../../../shared/services/src/lib/category/category.service';
import { Component, OnInit } from '@angular/core';
import { ICategory } from '@bushtrade/website/shared/entites';

@Component({
  selector: 'bushtrade-web-buying-index',
  templateUrl: './buying-index.component.html',
  styleUrls: ['./buying-index.component.scss'],
})
export class BuyingIndexComponent implements OnInit {
  subCategories: ICategory[];
  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.loadCategories().subscribe((categories) => {
      this.subCategories = categories;
    });
  }
}
