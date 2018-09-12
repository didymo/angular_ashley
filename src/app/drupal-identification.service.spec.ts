import { TestBed, inject } from '@angular/core/testing';

import { DrupalIdentificationService } from './drupal-identification.service';

describe('DrupalIdentificationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DrupalIdentificationService]
    });
  });

  it('should be created', inject([DrupalIdentificationService], (service: DrupalIdentificationService) => {
    expect(service).toBeTruthy();
  }));
});
