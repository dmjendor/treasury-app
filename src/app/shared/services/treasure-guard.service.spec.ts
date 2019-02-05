import { TestBed, inject } from '@angular/core/testing';

import { TreasureGuard } from './treasure-guard.service';

describe('TreasureGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TreasureGuard]
    });
  });

  it('should be created', inject([TreasureGuard], (service: TreasureGuard) => {
    expect(service).toBeTruthy();
  }));
});
