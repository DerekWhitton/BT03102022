import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportIndexComponent } from './support-index.component';

describe('SupportIndexComponent', () => {
  let component: SupportIndexComponent;
  let fixture: ComponentFixture<SupportIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupportIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
