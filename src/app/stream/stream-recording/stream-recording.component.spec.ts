import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamRecordingComponent } from './stream-recording.component';

describe('StreamRecordingComponent', () => {
  let component: StreamRecordingComponent;
  let fixture: ComponentFixture<StreamRecordingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StreamRecordingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamRecordingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
