import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamRecordingInfoComponent } from './stream-recording-info.component';

describe('StreamRecordingInfoComponent', () => {
  let component: StreamRecordingInfoComponent;
  let fixture: ComponentFixture<StreamRecordingInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StreamRecordingInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamRecordingInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
