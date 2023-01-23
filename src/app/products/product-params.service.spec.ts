import { TestBed } from '@angular/core/testing';

import { ProductParamsService } from './product-params.service';

describe('ProductParamsService', () => {
  let service: ProductParamsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductParamsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
