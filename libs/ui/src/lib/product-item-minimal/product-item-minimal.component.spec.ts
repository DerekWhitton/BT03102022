import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductItemMinimalComponent } from './product-item-minimal.component';

describe('ProductItemMinimalComponent', () => {
  let component: ProductItemMinimalComponent;
  let fixture: ComponentFixture<ProductItemMinimalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductItemMinimalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductItemMinimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
