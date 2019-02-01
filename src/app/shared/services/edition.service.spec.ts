import { TestBed, inject } from '@angular/core/testing';

import { EditionService } from './edition.service';

describe('EditionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditionService]
    });
  });

  it('should be created', inject([EditionService], (service: EditionService) => {
    expect(service).toBeTruthy();
  }));
});
