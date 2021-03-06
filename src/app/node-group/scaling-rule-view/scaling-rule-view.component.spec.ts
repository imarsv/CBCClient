import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ScalingRuleViewComponent } from './scaling-rule-view.component';

describe('ScalingRuleViewComponent', () => {
  let component: ScalingRuleViewComponent;
  let fixture: ComponentFixture<ScalingRuleViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ScalingRuleViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScalingRuleViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
