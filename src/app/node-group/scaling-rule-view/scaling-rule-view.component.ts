import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import {
  ComputingProvider,
  ScalingActionType, ScalingComparisonType,
  ScalingConditionMetricType, ScalingConditionType,
} from "../../service/node-group.service";

@Component({
  selector: 'app-scaling-rule-view',
  templateUrl: './scaling-rule-view.component.html',
  styleUrls: ['./scaling-rule-view.component.css']
})
export class ScalingRuleViewComponent implements OnInit {

  form: FormGroup;

  scalingComparisonType = ScalingComparisonType;
  scalingConditionMetricType = ScalingConditionMetricType;
  scalingActionType = ScalingActionType;
  computingProvider = ComputingProvider;

  @Input() editing: boolean = false;

  constructor(public activeModal: NgbActiveModal,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    let conditionSettings = this.fb.group({
      type: [ScalingConditionType.Liner],
      comparison: [ScalingComparisonType.More, [Validators.required]],
      value: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
      duration: [0, [Validators.required, Validators.min(0), Validators.max(300)]]
    });
    let condition = this.fb.group({
      metric: [ScalingConditionMetricType.CPUGroupAvg, [Validators.required]],
      settings: conditionSettings,
    });

    let actionResource = this.fb.group({
      provider: [ComputingProvider.AWS, [Validators.required]],
      value: ['', []],
      amount: [1, [Validators.required, Validators.min(1), Validators.max(32)]]
    });
    let action = this.fb.group({
      type: [ScalingActionType.Increase, [Validators.required]],
      resource: actionResource,
    });

    this.form = this.fb.group({
      condition: condition,
      action: action,
      actionTimeout: [0, [Validators.required, Validators.min(0), Validators.max(3600)]],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.activeModal.close(this.form.value);
    }
  }

}
