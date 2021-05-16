import { TestBed } from '@angular/core/testing';

import { EvalDetailsService } from './eval-details.service';

describe('EvalDetailsService', () => {
  let service: EvalDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EvalDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
