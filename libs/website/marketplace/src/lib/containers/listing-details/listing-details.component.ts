import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'listing-details',
  templateUrl: './listing-details.component.html',
  styleUrls: ['./listing-details.component.scss']
})
export class ListingDetailsComponent implements OnInit {
  
  msgs = [
    {severity:'warn', summary:'Warning', detail:"You'll need to Sign in or Create a free account before you can purchase."},
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
