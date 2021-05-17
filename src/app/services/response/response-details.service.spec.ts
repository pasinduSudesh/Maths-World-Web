import { TestBed } from '@angular/core/testing';

import { ResponseDetailsService } from './response-details.service';

describe('ResponseDetailsService', () => {
  let service: ResponseDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResponseDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
