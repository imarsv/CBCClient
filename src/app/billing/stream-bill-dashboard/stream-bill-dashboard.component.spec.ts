import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StreamBillDashboardComponent } from './stream-bill-dashboard.component';

describe('StreamBillDashboardComponent', () => {
  let component: StreamBillDashboardComponent;
  let fixture: ComponentFixture<StreamBillDashboardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StreamBillDashboardComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamBillDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
