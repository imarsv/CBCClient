import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StreamSnapshotComponent } from './stream-snapshot.component';

describe('StreamSnapshotComponent', () => {
  let component: StreamSnapshotComponent;
  let fixture: ComponentFixture<StreamSnapshotComponent>;

  beforeEach(waitForAsync(() => {
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
