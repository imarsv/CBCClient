import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeGroupDashboardComponent } from './node-group-dashboard.component';

describe('NodeGroupDashboardComponent', () => {
  let component: NodeGroupDashboardComponent;
  let fixture: ComponentFixture<NodeGroupDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NodeGroupDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeGroupDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
