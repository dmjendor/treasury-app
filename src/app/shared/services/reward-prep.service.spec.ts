import { TestBed, inject } from '@angular/core/testing';

import { RewardPrepService } from './reward-prep.service';

describe('RewardPrepService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RewardPrepService]
    });
  });

  it('should be created', inject([RewardPrepService], (service: RewardPrepService) => {
    expect(service).toBeTruthy();
  }));
});
