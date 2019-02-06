import { TestBed, inject } from '@angular/core/testing';

import { PrepTreasureService } from './prep-treasure.service';

describe('PrepTreasureService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PrepTreasureService]
    });
  });

  it('should be created', inject([PrepTreasureService], (service: PrepTreasureService) => {
    expect(service).toBeTruthy();
  }));
});
