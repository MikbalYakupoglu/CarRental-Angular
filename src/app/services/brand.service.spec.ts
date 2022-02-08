import { TestBed } from '@angular/core/testing';

import { BrandService as BrandService } from './brand.service';

describe('BrandserviceService', () => {
  let service: BrandService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrandService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
