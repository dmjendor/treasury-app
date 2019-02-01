import { TestBed, inject } from '@angular/core/testing';

import { CommerceService } from './commerce.service';

describe('CommerceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommerceService]
    });
  });

  it('should be created', inject([CommerceService], (service: CommerceService) => {
    expect(service).toBeTruthy();
  }));
});
