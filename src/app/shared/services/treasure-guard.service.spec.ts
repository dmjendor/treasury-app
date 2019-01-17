import { TestBed, inject } from '@angular/core/testing';

import { TreasureGuardService } from './treasure-guard.service';

describe('TreasureGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TreasureGuardService]
    });
  });

  it('should be created', inject([TreasureGuardService], (service: TreasureGuardService) => {
    expect(service).toBeTruthy();
  }));
});
