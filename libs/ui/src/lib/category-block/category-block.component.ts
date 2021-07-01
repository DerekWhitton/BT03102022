import { Router, RouterModule } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { ICategory, ListingType } from '@bushtrade/website/shared/entites';

@Component({
  selector: 'category-block',
  templateUrl: './category-block.component.html',
  styleUrls: ['./category-block.component.scss'],
})
export class CategoryBlockComponent implements OnInit {
  @Input() categories: ICategory[];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  navigateToCategory(categoryId): void {
    this.router.navigate(['/', 'listings'], {
      queryParams: {
        // type: ListingType.Auction,
        categoryId: categoryId,
      },
    });
  }
}
