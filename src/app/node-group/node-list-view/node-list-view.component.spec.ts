import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeListViewComponent } from './node-list-view.component';

describe('NodeListViewComponent', () => {
  let component: NodeListViewComponent;
  let fixture: ComponentFixture<NodeListViewComponent>;

  beforeEach(async(() => {
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
