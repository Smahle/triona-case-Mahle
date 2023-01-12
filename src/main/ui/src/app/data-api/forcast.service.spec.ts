/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ForcastService } from './forcast.service';

describe('Service: Forcast', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ForcastService]
    });
  });

  it('should ...', inject([ForcastService], (service: ForcastService) => {
    expect(service).toBeTruthy();
  }));
});
