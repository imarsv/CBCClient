import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OutputStreamConnectionComponent } from './output-stream-connection.component';

describe('OutputStreamConnectionComponent', () => {
  let component: OutputStreamConnectionComponent;
  let fixture: ComponentFixture<OutputStreamConnectionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OutputStreamConnectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutputStreamConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
