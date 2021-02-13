import { ICategory } from '@bushtrade/website/shared/entites';
import { CategoryService } from '@bushtrade/website/shared/services';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bushtrade-web-home-index',
  templateUrl: './home-index.component.html',
  styleUrls: ['./home-index.component.scss'],
})
export class HomeIndexComponent implements OnInit {
  maxFeaturedCategories: number = 8;
  pricerangeValues: number[] = [0, 1000];
  selectedMake: string[] = ['Armsan', 'Baikal', 'Baretta', 'Bora Arms'];
  cities: any = [];
  calibres: any = [];
  categories: ICategory[];
  latestItems = [];
  closingItems = [];

  responsiveOptions;

  constructor(private categoryService: CategoryService) {
    this.cities = [
      { name: 'Benoni' },
      { name: 'Boksburg' },
      { name: 'Brakpan' },
      { name: 'Carletonville' },
      { name: 'Germiston' },
      { name: 'Johannesburg' },
      { name: 'Krugersdorp' },
      { name: 'Pretoria' },
      { name: 'Randburg' },
      { name: 'Randfontein' },
      { name: 'Roodepoort' },
      { name: 'Soweta' },
      { name: 'Springs' },
    ];

    this.calibres = [
      { name: '17. HMR' },
      { name: '.22 LR' },
      { name: '.17 HORNET' },
      { name: '.17 MACH' },
      { name: '.17 REM' },
      { name: '.17 SWM' },
      { name: '.20 ACKLEY HORNET' },
      { name: '.20 TACTICAL' },
      { name: '.204' },
      { name: '.204 RUGER' },
    ];

    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3,
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2,
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }

  ngOnInit(): void {
    this.categoryService.loadFeaturedCategories(this.maxFeaturedCategories).subscribe((categories) => {
      this.categories = categories;
    });
  }
}
