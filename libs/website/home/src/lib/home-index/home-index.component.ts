import { Component, OnInit  } from '@angular/core';
@Component({
  selector: 'bushtrade-web-home-index',
  templateUrl: './home-index.component.html',
  styleUrls: ['./home-index.component.scss']
})
export class HomeIndexComponent implements OnInit {

  stockSizes: any[] = [];
  selectedStock: any;
  pricerangeValues: number[] = [0,1000];
  barrelrangeValues: number[] = [0,200];
  stockrangeValues: number[] = [0,200];
  selectedMechanisms: string[] = ['Back Action','Folding', 'Hammer', 'Pump Action'];
  selectedCalibre: string[] = [];
  selectedMake: string[] = ['Armsan','Baikal', 'Baretta', 'Bora Arms'];
  cities = [];
  calibres = [];

  constructor() {


      this.selectedMechanisms = [

      ]

      this.stockSizes = [
          {name: 'Small', code: 'SM', inactive: false},
          {name: 'Medium', code: 'MD', inactive: true},
          {name: 'Large', code: 'LG', inactive: false}
      ];
      
      this.cities = [
          {name: 'Benoni'},
          {name: 'Boksburg'},
          {name: 'Brakpan'},
          {name: 'Carletonville'},
          {name: 'Germiston'},
          {name: 'Johannesburg'},
          {name: 'Krugersdorp'},
          {name: 'Pretoria'},
          {name: 'Randburg'},
          {name: 'Randfontein'},
          {name: 'Roodepoort'},
          {name: 'Soweta'},
          {name: 'Springs'}
      ];

      this.calibres = [
          {name: '17. HMR'},
          {name: '.22 LR'},
          {name: '.17 HORNET'},
          {name: '.17 MACH'},
          {name: '.17 REM'},
          {name: '.17 SWM'},
          {name: '.20 ACKLEY HORNET'},
          {name: '.20 TACTICAL'},
          {name: '.204'},
          {name: '.204 RUGER'}
      ];

  }


  ngOnInit(): void {
  }

}
