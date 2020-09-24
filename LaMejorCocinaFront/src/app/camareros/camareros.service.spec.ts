import { TestBed } from '@angular/core/testing';

import { CamarerosService } from './camareros.service';

describe('CamarerosService', () => {
  let service: CamarerosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CamarerosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
