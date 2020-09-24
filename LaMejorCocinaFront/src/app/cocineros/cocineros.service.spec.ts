import { TestBed } from '@angular/core/testing';

import { CocinerosService } from './cocineros.service';

describe('CocinerosService', () => {
  let service: CocinerosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CocinerosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
