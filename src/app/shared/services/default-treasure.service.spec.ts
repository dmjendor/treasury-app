import { TestBed, inject } from '@angular/core/testing';

import { DefaultTreasureService } from './default-treasure.service';

describe('DefaultTreasureService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DefaultTreasureService]
    });
  });

  it('should be created', inject([DefaultTreasureService], (service: DefaultTreasureService) => {
    expect(service).toBeTruthy();
  }));
});
