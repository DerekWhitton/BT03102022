import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsiteIndexComponent } from './website-index.component';

describe('WebsiteIndexComponent', () => {
  let component: WebsiteIndexComponent;
  let fixture: ComponentFixture<WebsiteIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebsiteIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebsiteIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
