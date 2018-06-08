import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamStatisticsDashboardComponent } from './stream-statistics-dashboard.component';

describe('StreamStatisticsDashboardComponent', () => {
  let component: StreamStatisticsDashboardComponent;
  let fixture: ComponentFixture<StreamStatisticsDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StreamStatisticsDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamStatisticsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
