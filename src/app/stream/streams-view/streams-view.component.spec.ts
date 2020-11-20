import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StreamsViewComponent } from './streams-view.component';

describe('StreamsViewComponent', () => {
  let component: StreamsViewComponent;
  let fixture: ComponentFixture<StreamsViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StreamsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
