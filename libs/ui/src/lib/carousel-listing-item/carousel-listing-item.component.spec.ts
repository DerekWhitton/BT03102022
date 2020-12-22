import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselListingItemComponent } from './carousel-listing-item.component';

describe('CarouselListingItemComponent', () => {
  let component: CarouselListingItemComponent;
  let fixture: ComponentFixture<CarouselListingItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarouselListingItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselListingItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
