import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellingIndexComponent } from './selling-index.component';

describe('SellingIndexComponent', () => {
  let component: SellingIndexComponent;
  let fixture: ComponentFixture<SellingIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellingIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellingIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
