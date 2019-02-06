import { TestBed, inject } from '@angular/core/testing';

import { PrepValuablesService } from './prep-valuables.service';

describe('PrepValuablesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PrepValuablesService]
    });
  });

  it('should be created', inject([PrepValuablesService], (service: PrepValuablesService) => {
    expect(service).toBeTruthy();
  }));
});
