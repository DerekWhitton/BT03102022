import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalTopBarComponent } from './portal-top-bar.component';

describe('PortalTopBarComponent', () => {
  let component: PortalTopBarComponent;
  let fixture: ComponentFixture<PortalTopBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortalTopBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PortalTopBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
