import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumsIndexComponent } from './forums-index.component';

describe('ForumsIndexComponent', () => {
  let component: ForumsIndexComponent;
  let fixture: ComponentFixture<ForumsIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForumsIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumsIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
