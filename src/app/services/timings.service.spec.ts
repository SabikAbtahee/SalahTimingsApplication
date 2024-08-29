import { TestBed } from '@angular/core/testing';

import { TimingsService } from './timings.service';

describe('TimingsService', () => {
  let service: TimingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
