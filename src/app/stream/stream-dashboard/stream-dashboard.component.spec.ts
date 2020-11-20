import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StreamDashboardComponent } from './stream-dashboard.component';

describe('StreamDashboardComponent', () => {
  let component: StreamDashboardComponent;
  let fixture: ComponentFixture<StreamDashboardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StreamDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
