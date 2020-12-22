import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselHeroBannerComponent } from './carousel-hero-banner.component';

describe('CarouselHeroBannerComponent', () => {
  let component: CarouselHeroBannerComponent;
  let fixture: ComponentFixture<CarouselHeroBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarouselHeroBannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselHeroBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
