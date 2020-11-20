import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NodeEditComponent } from './node-edit.component';

describe('NodeEditComponent', () => {
  let component: NodeEditComponent;
  let fixture: ComponentFixture<NodeEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NodeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
