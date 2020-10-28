import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankingIndexComponent } from './banking-index.component';

describe('BankingIndexComponent', () => {
  let component: BankingIndexComponent;
  let fixture: ComponentFixture<BankingIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankingIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BankingIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
