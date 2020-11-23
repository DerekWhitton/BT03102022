import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalMenuItemComponent } from './portal-menu-item.component';

describe('PortalMenuItemComponent', () => {
  let component: PortalMenuItemComponent;
  let fixture: ComponentFixture<PortalMenuItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortalMenuItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PortalMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
