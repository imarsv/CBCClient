import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TranscodeDashboardComponent } from './transcode-dashboard.component';

describe('TranscodeDashboardComponent', () => {
  let component: TranscodeDashboardComponent;
  let fixture: ComponentFixture<TranscodeDashboardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TranscodeDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranscodeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
