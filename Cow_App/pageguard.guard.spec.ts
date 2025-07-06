import { TestBed } from '@angular/core/testing';

import { PageguardGuard } from './pageguard.guard';

describe('PageguardGuard', () => {
  let guard: PageguardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PageguardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
