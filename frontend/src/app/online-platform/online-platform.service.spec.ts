import { TestBed } from '@angular/core/testing';

import { OnlinePlatformService } from './online-platform.service';

describe('OnlinePlatformService', () => {
  let service: OnlinePlatformService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OnlinePlatformService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
