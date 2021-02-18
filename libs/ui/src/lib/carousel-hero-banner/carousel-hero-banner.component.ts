import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'carousel-hero-banner',
  templateUrl: './carousel-hero-banner.component.html',
  styleUrls: ['./carousel-hero-banner.component.scss']
})
export class CarouselHeroBannerComponent implements OnInit {

  mobile: boolean;

  banners:any = [
    {
      "id": "1000",
      "image": "https://via.placeholder.com/1200x380.jpg",
      "title": "2000+ Hunting Aids",
      "label": "View More"
    },
    {
      "id": "1000",
      "image": "https://via.placeholder.com/1200x380.jpg",
      "title": "Big Ammo Sale!",
      "label": "Stock Up"
    },
    {
      "id": "1000",
      "image": "https://via.placeholder.com/1200x380.jpg",
      "title": "Carnivore Month",
      "label": "View Meats"
    },            
  ];
  pricerange:any =[
    {price: 'R1000'},
    {price: 'R2000'},
    {price: 'R3000'},
    {price: 'R4000'},
    {price: 'R5000'},
  ];
  types:any =[
    {type: 'Type 001'},
    {type: 'Type 002'},
    {type: 'Type 003'},
    {type: 'Type 004'},
    {type: 'Type 005'},
  ];
  makes:any =[
    {make: 'Make 001'},
    {make: 'Make 002'},
    {make: 'Make 003'},
    {make: 'Make 004'},
    {make: 'Make 005'},
  ];


  constructor() { }

  ngOnInit(): void {
      console.log(window.screen.width);
    if (window.screen.width < 512) { // 768px portrait
      this.mobile = true;
    }

  }

}
