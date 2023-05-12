import { TestBed } from '@angular/core/testing';

import { CurrencySymbolService } from './currency-symbol.service';

describe('CurrencySymbolService', () => {
  let service: CurrencySymbolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrencySymbolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
