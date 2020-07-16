import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamUsageDetailsComponent } from './stream-usage-details.component';

describe('StreamUsageDetailsComponent', () => {
  let component: StreamUsageDetailsComponent;
  let fixture: ComponentFixture<StreamUsageDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StreamUsageDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamUsageDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
