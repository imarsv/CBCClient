import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamBillDashboardComponent } from './stream-bill-dashboard.component';

describe('StreamBillDashboardComponent', () => {
  let component: StreamBillDashboardComponent;
  let fixture: ComponentFixture<StreamBillDashboardComponent>;

  beforeEach(async(() => {
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
