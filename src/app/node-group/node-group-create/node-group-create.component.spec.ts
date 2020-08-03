import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeGroupCreateComponent } from './node-group-create.component';

describe('NodeGroupCreateComponent', () => {
  let component: NodeGroupCreateComponent;
  let fixture: ComponentFixture<NodeGroupCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NodeGroupCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeGroupCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
