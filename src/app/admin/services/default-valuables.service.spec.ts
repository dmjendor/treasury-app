import { TestBed, inject } from '@angular/core/testing';

import { DefaultValuablesService } from './default-valuables.service';

describe('DefaultValuablesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DefaultValuablesService]
    });
  });

  it('should be created', inject([DefaultValuablesService], (service: DefaultValuablesService) => {
    expect(service).toBeTruthy();
  }));
});
