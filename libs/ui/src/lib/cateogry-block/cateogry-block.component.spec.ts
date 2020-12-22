import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CateogryBlockComponent } from './cateogry-block.component';

describe('CateogryBlockComponent', () => {
  let component: CateogryBlockComponent;
  let fixture: ComponentFixture<CateogryBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CateogryBlockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CateogryBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
