import { TestBed, inject } from '@angular/core/testing';

import { PrepCoinService } from './prep-coin.service';

describe('PrepCoinService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PrepCoinService]
    });
  });

  it('should be created', inject([PrepCoinService], (service: PrepCoinService) => {
    expect(service).toBeTruthy();
  }));
});
