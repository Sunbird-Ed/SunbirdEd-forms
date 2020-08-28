import { TestBed } from '@angular/core/testing';

import { CommonFormElementsService } from './common-form-elements.service';

describe('CommonFormElementsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommonFormElementsService = TestBed.get(CommonFormElementsService);
    expect(service).toBeTruthy();
  });
});
