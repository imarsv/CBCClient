import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NodeGroupsListComponent } from './node-groups-list.component';

describe('NodeGroupsListComponent', () => {
  let component: NodeGroupsListComponent;
  let fixture: ComponentFixture<NodeGroupsListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NodeGroupsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeGroupsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
