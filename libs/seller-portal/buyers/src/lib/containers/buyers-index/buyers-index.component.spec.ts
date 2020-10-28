import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyersIndexComponent } from './buyers-index.component';

describe('BuyersIndexComponent', () => {
  let component: BuyersIndexComponent;
  let fixture: ComponentFixture<BuyersIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyersIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyersIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
