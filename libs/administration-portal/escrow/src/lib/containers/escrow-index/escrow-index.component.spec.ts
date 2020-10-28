import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EscrowIndexComponent } from './escrow-index.component';

describe('EscrowIndexComponent', () => {
  let component: EscrowIndexComponent;
  let fixture: ComponentFixture<EscrowIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EscrowIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EscrowIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
