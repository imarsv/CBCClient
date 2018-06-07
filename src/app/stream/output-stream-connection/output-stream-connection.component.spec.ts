import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputStreamConnectionComponent } from './output-stream-connection.component';

describe('OutputStreamConnectionComponent', () => {
  let component: OutputStreamConnectionComponent;
  let fixture: ComponentFixture<OutputStreamConnectionComponent>;

  beforeEach(async(() => {
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
