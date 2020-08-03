import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeGroupsListComponent } from './node-groups-list.component';

describe('NodeGroupsListComponent', () => {
  let component: NodeGroupsListComponent;
  let fixture: ComponentFixture<NodeGroupsListComponent>;

  beforeEach(async(() => {
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
