import { TestBed, async, inject } from '@angular/core/testing';

import { FirstGuard } from './first.guard';

describe('FirstGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FirstGuard]
    });
  });

  it('should ...', inject([FirstGuard], (guard: FirstGuard) => {
    expect(guard).toBeTruthy();
  }));
});
