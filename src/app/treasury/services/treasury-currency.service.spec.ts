import { TestBed, inject } from '@angular/core/testing';

import { TreasuryCurrencyService } from './treasury-currency.service';

describe('TreasuryCurrencyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TreasuryCurrencyService]
    });
  });

  it('should be created', inject([TreasuryCurrencyService], (service: TreasuryCurrencyService) => {
    expect(service).toBeTruthy();
  }));
});
