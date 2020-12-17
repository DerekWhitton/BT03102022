import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingsIndexComponent } from './listings-index.component';

describe('ListingsIndexComponent', () => {
  let component: ListingsIndexComponent;
  let fixture: ComponentFixture<ListingsIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListingsIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingsIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
