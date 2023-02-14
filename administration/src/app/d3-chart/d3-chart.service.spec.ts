import { TestBed } from '@angular/core/testing';

import { D3ChartService } from './d3-chart.service';

describe('D3ChartService', () => {
  let service: D3ChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(D3ChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
