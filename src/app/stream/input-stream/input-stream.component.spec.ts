import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InputStreamComponent } from './input-stream.component';

describe('InputStreamComponent', () => {
  let component: InputStreamComponent;
  let fixture: ComponentFixture<InputStreamComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InputStreamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputStreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
