import { TestBed, inject } from '@angular/core/testing';

import { DefaultBagService } from './default-bag.service';

describe('DefaultBagService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DefaultBagService]
    });
  });

  it('should be created', inject([DefaultBagService], (service: DefaultBagService) => {
    expect(service).toBeTruthy();
  }));
});
