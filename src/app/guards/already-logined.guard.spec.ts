import { TestBed } from '@angular/core/testing';

import { AlreadyLoginedGuard } from './already-logined.guard';

describe('AlreadyLoginedGuard', () => {
  let guard: AlreadyLoginedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AlreadyLoginedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
