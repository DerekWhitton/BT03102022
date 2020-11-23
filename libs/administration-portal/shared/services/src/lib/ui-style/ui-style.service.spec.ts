import { TestBed } from '@angular/core/testing';

import { UiStyleService } from './ui-style.service';

describe('UiStyleService', () => {
  let service: UiStyleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UiStyleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
