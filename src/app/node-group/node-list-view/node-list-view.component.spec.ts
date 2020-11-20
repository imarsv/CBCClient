import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NodeListViewComponent } from './node-list-view.component';

describe('NodeListViewComponent', () => {
  let component: NodeListViewComponent;
  let fixture: ComponentFixture<NodeListViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NodeListViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
