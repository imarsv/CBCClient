import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  ComputingProvider,
  NodeGroup,
  NodeGroupResource,
  NodeGroupService,
  ResourceType, ScalingActionIncreaseSettings,
  ScalingActionType,
  ScalingComparisonType,
  ScalingConditionMetricType,
  ScalingConditionType,
  ScalingRule
} from '../../service/node-group.service';
import { NodeGroupCreateComponent } from '../node-group-create/node-group-create.component';
import { ScalingRuleViewComponent } from '../scaling-rule-view/scaling-rule-view.component';

@Component({
  selector: 'app-node-group-dashboard',
  templateUrl: './node-group-dashboard.component.html',
  styleUrls: ['./node-group-dashboard.component.css']
})
export class NodeGroupDashboardComponent implements OnInit {

  group: NodeGroup | undefined = undefined;
  resourceType = ResourceType;
  private id: string;

  constructor(private nodeGroupService: NodeGroupService,
              private modalService: NgbModal,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.id = activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.load();
  }

  async editGroup() {
    const createNodeGroupModal = this.modalService.open(NodeGroupCreateComponent);
    createNodeGroupModal.componentInstance.group = this.group;
    createNodeGroupModal.componentInstance.update = true;

    try {
      const group = await createNodeGroupModal.result;
      if (group) {
        this.group.name = group.name;
        this.group.description = group.description;
        this.nodeGroupService.update(this.id, this.group).subscribe(
          () => this.load(),
          error => alert(error?.error?.message ? error.error.message : 'Something wrong with node group loading on update'));
      }
    } catch (e) {
    }
  }

  updateGroupScalable(enabled: boolean) {
    this.group.scalable = enabled;
    this.nodeGroupService.update(this.id, this.group).subscribe(
      () => this.load(),
      error => alert(error?.error?.message ? error.error.message : 'Something wrong with node group loading on update'));
  }

  async appendScalingRule() {
    try {
      const scalingRuleViewComponentModal = this.modalService.open(ScalingRuleViewComponent);

      try {
        const value = await scalingRuleViewComponentModal.result;
        this.nodeGroupService.addScalingRule(this.id, value).subscribe(
          () => this.load(),
          error => alert(error?.error?.message ? error.error.message : 'Something wrong on appending scale group')
        );
      } catch (e) {}

    } catch (e) {
      console.error(e);
    }
  }

  getUserFriendlyScalingRuleCondition(rule: ScalingRule) {
    let description = 'When';

    if (rule.condition.metric === ScalingConditionMetricType.CPUGroupAvg) {
      description += ' average CPU';
    }

    if (rule.condition.metric === ScalingConditionMetricType.BWGroupAvg) {
      description += ' average BW';
    }

    if (rule.condition.settings.type === ScalingConditionType.Liner) {
      description += ' ';

      if (rule.condition.settings.comparison === ScalingComparisonType.More) {
        description += 'more';
      }
      if (rule.condition.settings.comparison === ScalingComparisonType.Less) {
        description += 'less';
      }

      description += ' than ';
      description += rule.condition.settings.value + '% for ' + rule.condition.settings.duration + ' seconds';
    }

    return description;
  }

  getUserFriendlyScalingRuleAction(rule: ScalingRule) {
    let description = 'Than';

    if (rule.action.type === ScalingActionType.Increase) {
      description += ' append';
    }
    if (rule.action.type === ScalingActionType.Reduce) {
      description += ' reduce';
    }

    const settings = <ScalingActionIncreaseSettings>rule.action.settings;
    description += ' ' + rule.action.settings.amount;

    if (settings.value && settings.value.length > 0) {
      description += ' (' + settings.value + ')';
    }

    description += ' node(s) in ';

    if (settings.provider === ComputingProvider.AWS) {
      description += ' AWS ';
    }

    return description;
  }

  async editScalingRule(rule: ScalingRule) {
    try {
      const nodal = this.modalService.open(ScalingRuleViewComponent);
      nodal.componentInstance.editing = true;
      nodal.componentInstance.rule = rule;

      try {
        const value = await nodal.result;
        rule.condition = value.condition;
        rule.action = value.action;
        rule.actionTimeout = value.actionTimeout;
        this.nodeGroupService.updateScalingRule(this.id, rule.id, rule).subscribe(
          () => this.load(),
          error => alert(error?.error?.message ? error.error.message : 'Something wrong on updating scale rule')
        );
      } catch (e) {}

    } catch (e) {
      console.error(e);
    }
  }

  updateScalingRuleEnablement(value, rule: ScalingRule) {
    if (value !== rule.enabled) {
      rule.enabled = value;
      this.updateScalingRule(rule);
    }
  }

  updateScalingRule(rule: ScalingRule) {
    this.nodeGroupService.updateScalingRule(this.id, rule.id, rule).subscribe(
      () => this.load(),
      error => alert(error?.error?.message ? error.error.message : 'Something wrong on updating scaling rule')
    );
  }

  trackByRule(index: any, rule: ScalingRule) {
    return rule.id;
  }

  removeScalingRule(rule: ScalingRule) {
    this.nodeGroupService.removeScalingRule(this.id, rule.id).subscribe(
      () => this.load(),
      error => alert(error?.error?.message ? error.error.message : 'Something wrong on deleting scaling rule')
    );
  }

  appendNode() {

  }

  getGroupResources(type: ResourceType) {
    return this.group.resources.filter(item => item.type === type);
  }

  trackByGroupResource(index: any, resource: NodeGroupResource) {
    return resource.id;
  }

  private load() {
    this.nodeGroupService.get(this.id).subscribe(
      group => this.group = group,
      error => alert(error?.error?.message ? error.error.message : 'Something wrong with node group loading on dashboard')
    );
  }

  groupResourceTypesViewOrder() {
    return [ ResourceType.Persistent, ResourceType.Allocated ];
  }
}
