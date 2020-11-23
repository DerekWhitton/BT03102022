import { TestBed } from '@angular/core/testing';

import { PortalMenuService } from './portal-menu.service';

describe('PortalMenuService', () => {
  let service: PortalMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PortalMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
