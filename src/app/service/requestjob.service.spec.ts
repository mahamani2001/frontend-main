import { TestBed } from '@angular/core/testing';

import { RequestjobService } from './requestjob.service';

describe('RequestjobService', () => {
  let service: RequestjobService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestjobService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
