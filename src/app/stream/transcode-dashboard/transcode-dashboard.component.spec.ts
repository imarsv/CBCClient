import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranscodeDashboardComponent } from './transcode-dashboard.component';

describe('TranscodeDashboardComponent', () => {
  let component: TranscodeDashboardComponent;
  let fixture: ComponentFixture<TranscodeDashboardComponent>;

  beforeEach(async(() => {
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
