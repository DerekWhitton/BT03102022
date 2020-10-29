import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouritesIndexComponent } from './favourites-index.component';

describe('FavouritesIndexComponent', () => {
  let component: FavouritesIndexComponent;
  let fixture: ComponentFixture<FavouritesIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavouritesIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavouritesIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
