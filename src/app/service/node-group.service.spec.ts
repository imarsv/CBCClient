import { TestBed } from '@angular/core/testing';

import { NodeGroupService } from './node-group.service';

describe('NodeGroupService', () => {
  let service: NodeGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NodeGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
