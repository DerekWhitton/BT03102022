import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICategory, ListingType } from '@bushtrade/website/shared/entites';

@Component({
  selector: 'cateogry-block',
  templateUrl: './cateogry-block.component.html',
  styleUrls: ['./cateogry-block.component.scss'],
})
export class CateogryBlockComponent implements OnInit {
  @Input() categories: ICategory[];
  constructor(private router: Router) {}

  ngOnInit(): void {}

  navigateToCategory(categoryId): void {
    this.router.navigate(['/', 'listings'], {
      queryParams: { 
        type: ListingType.Auction,
        categoryId: categoryId
      },
    });
  }
}
