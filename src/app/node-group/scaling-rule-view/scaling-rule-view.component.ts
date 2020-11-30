import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {
  ComputingProvider,
  ScalingActionType,
  ScalingComparisonType,
  ScalingConditionSettingsType,
  ScalingConditionType,
  ScalingRule,
} from '../../service/node-group.service';

@Component({
  selector: 'app-scaling-rule-view',
  templateUrl: './scaling-rule-view.component.html',
  styleUrls: [ './scaling-rule-view.component.css' ]
})
export class ScalingRuleViewComponent implements OnInit {

  form: FormGroup;
  condition: FormGroup;

  scalingComparisonType = ScalingComparisonType;
  scalingConditionType = ScalingConditionType;
  scalingActionType = ScalingActionType;
  computingProvider = ComputingProvider;

  @Input() editing = false;
  @Input() rule: ScalingRule;

  constructor(public activeModal: NgbActiveModal,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    const conditionType = this.fb.control(ScalingConditionType.CPUGroupAvg, Validators.required);
    conditionType.valueChanges.subscribe(type => this.updateConditionSettingsForm(type));
    this.condition = this.fb.group({
      type: conditionType,
      settings: this.getLinerConditionSettingsForm(),
    });

    const actionSettings = this.fb.group({
      provider: [ ComputingProvider.AWS, [ Validators.required ] ],
      value: [ '', [] ],
      bandwidthLimitMbps: [1000, [Validators.required, Validators.min(0)]],
      amount: [ 1, [ Validators.required, Validators.min(1), Validators.max(32) ] ]
    });
    const action = this.fb.group({
      type: [ ScalingActionType.Increase, [ Validators.required ] ],
      settings: actionSettings,
    });

    this.form = this.fb.group({
      condition: this.condition,
      action: action,
      actionTimeout: [ 0, [ Validators.required, Validators.min(0), Validators.max(3600) ] ],
    });

    if (this.editing && this.rule) {
      this.form.patchValue(this.rule);
    }
  }

  private updateConditionSettingsForm(type: ScalingConditionType) {
    console.log('conditionType: ', type);

    if (type === ScalingConditionType.GroupFull) {
      this.condition.setControl('settings', this.getNoneConditionSettingsForm());
    }

    if (type === ScalingConditionType.CPUGroupAvg) {
      this.condition.setControl('settings', this.getLinerConditionSettingsForm());
    }
  }

  private getNoneConditionSettingsForm() {
    return this.fb.group({
      type: [ ScalingConditionSettingsType.None ],
    });
  }

  private getLinerConditionSettingsForm() {
    return this.fb.group({
      type: [ ScalingConditionSettingsType.Liner ],
      comparison: [ ScalingComparisonType.More, [ Validators.required ] ],
      value: [ 0, [ Validators.required, Validators.min(0), Validators.max(100) ] ],
      duration: [ 0, [ Validators.required, Validators.min(0), Validators.max(300) ] ]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.activeModal.close(this.form.value);
    }
  }

  get bandwidthLimit() {
    return (this.form.get('action').get('settings').get('bandwidthLimitMbps').value * 1000000) / 8;
  }

}
