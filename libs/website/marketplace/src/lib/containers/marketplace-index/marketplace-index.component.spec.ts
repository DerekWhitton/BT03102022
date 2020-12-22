import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketplaceIndexComponent } from './marketplace-index.component';

describe('MarketplaceIndexComponent', () => {
  let component: MarketplaceIndexComponent;
  let fixture: ComponentFixture<MarketplaceIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketplaceIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketplaceIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
