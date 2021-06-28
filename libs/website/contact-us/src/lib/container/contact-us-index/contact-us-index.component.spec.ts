import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactUsIndexComponent } from './contact-us-index.component';

describe('ContactUsIndexComponent', () => {
  let component: ContactUsIndexComponent;
  let fixture: ComponentFixture<ContactUsIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactUsIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactUsIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
