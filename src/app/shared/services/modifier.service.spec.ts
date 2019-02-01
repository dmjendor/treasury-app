import { TestBed, inject } from '@angular/core/testing';

import { ModifierService } from './modifier.service';

describe('ModifierService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModifierService]
    });
  });

  it('should be created', inject([ModifierService], (service: ModifierService) => {
    expect(service).toBeTruthy();
  }));
});
