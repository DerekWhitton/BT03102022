import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'carousel-listing-item',
  templateUrl: './carousel-listing-item.component.html',
  styleUrls: ['./carousel-listing-item.component.scss']
})
export class CarouselListingItemComponent implements OnInit {

  responsiveOptions;
  
  products:any = [
    {
      "id": "1000",
      "name": "Beretta 12 gauge 686 White Onyx Sporting",
      "image": "https://via.placeholder.com/229x152.jpg",
      "price": 65,
      "category": "Guns",
      "location": "Western Cape",
      "date": "2 Days ago",
      "type": "reduced"
    },
    {
      "id": "1000",
      "name": "Beretta 12 gauge 686 White Onyx Sporting",
      "image": "https://via.placeholder.com/229x152.jpg",
      "price": 65,
      "category": "Guns",
      "location": "Western Cape",
      "date": "2 Days ago",
      "type": "reduced"
    },
    {
      "id": "1000",
      "name": "Beretta 12 gauge 686 White Onyx Sporting",
      "image": "https://via.placeholder.com/229x152.jpg",
      "price": 65,
      "category": "Guns",
      "location": "Western Cape",
      "date": "2 Days ago",
      "type": "reduced"
    },
    {
      "id": "1000",
      "name": "Beretta 12 gauge 686 White Onyx Sporting",
      "image": "https://via.placeholder.com/229x152.jpg",
      "price": 65,
      "category": "Guns",
      "location": "Western Cape",
      "date": "2 Days ago",
      "type": "reduced"
    },
    {
      "id": "1000",
      "name": "Beretta 12 gauge 686 White Onyx Sporting",
      "image": "https://via.placeholder.com/229x152.jpg",
      "price": 65,
      "category": "Guns",
      "location": "Western Cape",
      "date": "2 Days ago",
      "type": "reduced"
    },
    {
      "id": "1000",
      "name": "Beretta 12 gauge 686 White Onyx Sporting",
      "image": "https://via.placeholder.com/229x152.jpg",
      "price": 65,
      "category": "Guns",
      "location": "Western Cape",
      "date": "2 Days ago",
      "type": "reduced"
    },
    {
      "id": "1000",
      "name": "Beretta 12 gauge 686 White Onyx Sporting",
      "image": "https://via.placeholder.com/229x152.jpg",
      "price": 65,
      "category": "Guns",
      "location": "Western Cape",
      "date": "2 Days ago",
      "type": "reduced"
    },
    {
      "id": "1000",
      "name": "Beretta 12 gauge 686 White Onyx Sporting",
      "image": "https://via.placeholder.com/229x152.jpg",
      "price": 65,
      "category": "Guns",
      "location": "Western Cape",
      "date": "2 Days ago",
      "type": "reduced"
    },
    {
      "id": "1000",
      "name": "Beretta 12 gauge 686 White Onyx Sporting",
      "image": "https://via.placeholder.com/229x152.jpg",
      "price": 65,
      "category": "Guns",
      "location": "Western Cape",
      "date": "2 Days ago",
      "type": "reduced"
    },
    {
      "id": "1000",
      "name": "Beretta 12 gauge 686 White Onyx Sporting",
      "image": "https://via.placeholder.com/229x152.jpg",
      "price": 65,
      "category": "Guns",
      "location": "Western Cape",
      "date": "2 Days ago",
      "type": "reduced"
    },
    {
      "id": "1000",
      "name": "Beretta 12 gauge 686 White Onyx Sporting",
      "image": "https://via.placeholder.com/229x152.jpg",
      "price": 65,
      "category": "Guns",
      "location": "Western Cape",
      "date": "2 Days ago",
      "type": "reduced"
    },
    {
      "id": "1000",
      "name": "Beretta 12 gauge 686 White Onyx Sporting",
      "image": "https://via.placeholder.com/229x152.jpg",
      "price": 65,
      "category": "Guns",
      "location": "Western Cape",
      "date": "2 Days ago",
      "type": "reduced"
    },
    {
      "id": "1000",
      "name": "Beretta 12 gauge 686 White Onyx Sporting",
      "image": "https://via.placeholder.com/229x152.jpg",
      "price": 65,
      "category": "Guns",
      "location": "Western Cape",
      "date": "2 Days ago",
      "type": "reduced"
    },

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
