import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'carousel-hero-banner',
  templateUrl: './carousel-hero-banner.component.html',
  styleUrls: ['./carousel-hero-banner.component.scss']
})
export class CarouselHeroBannerComponent implements OnInit {


  responsiveOptions;

  banners:any = [
    {
      "id": "1000",
      "image": "https://via.placeholder.com/1200x380.jpg",
      "title": "2000+ Hunting Aids"
    },
  ];
  pricerange:any =[
    {name: 'R1000'},
    {name: 'R2000'},
    {name: 'R3000'},
    {name: 'R4000'},
    {name: 'R5000'},
  ];
  types:any =[
    {name: 'Type 001'},
    {name: 'Type 002'},
    {name: 'Type 003'},
    {name: 'Type 004'},
    {name: 'Type 005'},
  ];
  makes:any =[
    {name: 'Make 001'},
    {name: 'Make 002'},
    {name: 'Make 003'},
    {name: 'Make 004'},
    {name: 'Make 005'},
  ];


  constructor() { 

    this.responsiveOptions = [
      {
          breakpoint: '1024px',
          numVisible: 3,
          numScroll: 3
      },
      {
          breakpoint: '768px',
          numVisible: 2,
          numScroll: 2
      },
      {
          breakpoint: '560px',
          numVisible: 1,
          numScroll: 1
      }
  ];

  }

  ngOnInit(): void {
  }

}
