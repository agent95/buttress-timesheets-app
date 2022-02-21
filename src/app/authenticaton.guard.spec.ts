import { TestBed } from '@angular/core/testing';

import { AuthenticatonGuard } from './authenticaton.guard';

describe('AuthenticatonGuard', () => {
  let guard: AuthenticatonGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthenticatonGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
