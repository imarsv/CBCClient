import { TestBed, inject } from '@angular/core/testing';

import { StreamStatisticalService } from './stream-statistical.service';

describe('StatisticsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StreamStatisticalService]
    });
  });

  it('should be created', inject([StreamStatisticalService], (service: StreamStatisticalService) => {
    expect(service).toBeTruthy();
  }));
});
