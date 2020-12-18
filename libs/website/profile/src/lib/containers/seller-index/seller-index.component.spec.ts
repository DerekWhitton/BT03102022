import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerIndexComponent } from './seller-index.component';

describe('SellerIndexComponent', () => {
  let component: SellerIndexComponent;
  let fixture: ComponentFixture<SellerIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
