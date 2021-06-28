import { ListingType } from '@bushtrade/website/shared/entites';
import { Component, OnInit } from '@angular/core';
import {
  AdvertismentsService,
  CategoryService,
  SearchService,
} from '@bushtrade/website/shared/services';
import { Router } from '@angular/router';

@Component({
  selector: 'carousel-hero-banner',
  templateUrl: './carousel-hero-banner.component.html',
  styleUrls: ['./carousel-hero-banner.component.scss'],
})
export class CarouselHeroBannerComponent implements OnInit {
  mobile: boolean;
  searchCategoryId: string;
  searchPriceRange: number[] = [];
  searchListingType: ListingType;
  maxPrice: number = null;
  selectableListingTypes: any[];
  categories: any[];
  loaded = false;
  banners: any = [];

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private searchService: SearchService,
    private advertismentsService: AdvertismentsService
  ) {
    if (window.screen.width < 512) {
      // 768px portrait
      this.mobile = true;
    }
    this.selectableListingTypes = Object.keys(ListingType)
      .filter((s) => isNaN(Number(s)))
      .map((s) => {
        return { label: s, value: ListingType[s] };
      });
  }

  ngOnInit(): void {
    this.categoryService.loadCategories(null, true).subscribe((categories) => {
      this.categories = categories.map((c) => {
        return { label: c.name, value: c.id };
      });
    });
    this.advertismentsService
      .listDashboardAdvertisments(5, true)
      .subscribe((result) => {
        this.loaded = true;
        setTimeout(() => {
          this.banners = result;
        }, 0);
      });
    this.setMaxPrice();
  }

  submitQuickSearch() {
    this.router.navigate(['/', 'listings'], {
      queryParams: {
        type: this.searchListingType,
        categoryId: this.searchCategoryId,
        minPrice: this.searchPriceRange[0],
        maxPrice: this.searchPriceRange[1],
      },
    });
  }

  private setMaxPrice() {
    this.searchService
      .getMaxPrice(this.searchListingType)
      .subscribe((maxPrice) => {
        this.maxPrice = maxPrice ?? 0;
        this.searchPriceRange = [0, maxPrice];
      });
  }
}
