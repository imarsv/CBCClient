import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputStreamComponent } from './output-stream.component';

describe('OutputStreamComponent', () => {
  let component: OutputStreamComponent;
  let fixture: ComponentFixture<OutputStreamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutputStreamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutputStreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
