import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertisementsIndexComponent } from './advertisements-index.component';

describe('AdvertisementsIndexComponent', () => {
  let component: AdvertisementsIndexComponent;
  let fixture: ComponentFixture<AdvertisementsIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvertisementsIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertisementsIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
