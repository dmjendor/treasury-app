import { TestBed, inject } from '@angular/core/testing';

import { DefaultItemsService } from './default-items.service';

describe('DefaultItemsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DefaultItemsService]
    });
  });

  it('should be created', inject([DefaultItemsService], (service: DefaultItemsService) => {
    expect(service).toBeTruthy();
  }));
});
