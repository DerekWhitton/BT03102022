import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrophyCabinetIndexComponent } from './trophy-cabinet-index.component';

describe('TrophyCabinetIndexComponent', () => {
  let component: TrophyCabinetIndexComponent;
  let fixture: ComponentFixture<TrophyCabinetIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrophyCabinetIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrophyCabinetIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
