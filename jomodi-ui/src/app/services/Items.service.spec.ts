import { TestBed } from '@angular/core/testing';

import { ShowcaseServiceService } from './Items.service';

describe('ShowcaseServiceService', () => {
  let service: ShowcaseServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowcaseServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
