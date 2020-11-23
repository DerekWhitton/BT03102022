import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuySellIndexComponent } from './buy-sell-index.component';

describe('BuySellIndexComponent', () => {
  let component: BuySellIndexComponent;
  let fixture: ComponentFixture<BuySellIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuySellIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuySellIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
