import { TestBed, inject } from '@angular/core/testing';

import { TreasureService } from './treasure.service';

describe('TreasureService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TreasureService]
    });
  });

  it('should be created', inject([TreasureService], (service: TreasureService) => {
    expect(service).toBeTruthy();
  }));
});
