import { TestBed, inject } from '@angular/core/testing';

import { ValuablesService } from './valuables.service';

describe('ValuablesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValuablesService]
    });
  });

  it('should be created', inject([ValuablesService], (service: ValuablesService) => {
    expect(service).toBeTruthy();
  }));
});
