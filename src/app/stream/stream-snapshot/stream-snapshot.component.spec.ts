import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamSnapshotComponent } from './stream-snapshot.component';

describe('StreamSnapshotComponent', () => {
  let component: StreamSnapshotComponent;
  let fixture: ComponentFixture<StreamSnapshotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StreamSnapshotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamSnapshotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
