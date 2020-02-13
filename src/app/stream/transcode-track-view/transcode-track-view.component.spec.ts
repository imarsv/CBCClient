import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranscodeTrackViewComponent } from './transcode-track-view.component';

describe('TranscodeTrackViewComponent', () => {
  let component: TranscodeTrackViewComponent;
  let fixture: ComponentFixture<TranscodeTrackViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranscodeTrackViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranscodeTrackViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
