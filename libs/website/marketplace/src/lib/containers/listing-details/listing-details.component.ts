import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'listing-details',
  templateUrl: './listing-details.component.html',
  styleUrls: ['./listing-details.component.scss']
})
export class ListingDetailsComponent implements OnInit {
  
  relatedItems = [];

  val: number = 3;

  bids:any = [
    {name:'Bidder 123',date:'13 Aug 2020', value:'R1600'},
    {name:'Bidder 123',date:'13 Aug 2020', value:'R2600'},
    {name:'Bidder 123',date:'13 Aug 2020', value:'R3600'},
    {name:'Bidder 123',date:'13 Aug 2020', value:'R4600'}
  ];

  specifications:any = [
    {name:'Make',value:'Beretta'},
    {name:'Model',value:'694'},
    {name:'License',value:'Shotgun'},
    {name:'Orient',value:'Right Handed'},
    {name:'Stock',value:'32"'}
  ];

  msgs:any = [
    {severity:'warn', summary:'Warning', detail:"You'll need to Sign in or Create a free account before you can purchase."},
  ];
  // https://via.placeholder.com/290
  images:any = [
    {
      "previewImageSrc": "https://via.placeholder.com/865x360.jpg",
      "thumbnailImageSrc": "https://via.placeholder.com/50x50.jpg",
      "alt": "Description for Image 1",
      "title": "Title 1"
  },
  {
      "previewImageSrc": "https://via.placeholder.com/863x360.jpg",
      "thumbnailImageSrc": "https://via.placeholder.com/50x50.jpg",
      "alt": "Description for Image 2",
      "title": "Title 2"
  },
  {
    "previewImageSrc": "https://via.placeholder.com/862x360.jpg",
    "thumbnailImageSrc": "https://via.placeholder.com/50x50.jpg",
      "alt": "Description for Image 3",
      "title": "Title 3"
  },
  {
    "previewImageSrc": "https://via.placeholder.com/861x360.jpg",
    "thumbnailImageSrc": "https://via.placeholder.com/50x50.jpg",
      "alt": "Description for Image 4",
      "title": "Title 4"
  }
  ];


  constructor() { }

  ngOnInit(): void {
  }

}
