import { TestBed } from '@angular/core/testing';

import { AppStateManagerService } from './app-state-manager.service';

describe('AppStateManagerService', () => {
  let service: AppStateManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppStateManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
