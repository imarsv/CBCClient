import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import {
  ComputingProvider,
  NodeGroup,
  NodeGroupService,
  ScalingActionType,
  ScalingComparisonType,
  ScalingConditionMetricType,
  ScalingConditionType,
  ScalingRule
} from "../../service/node-group.service";
import { NodeGroupCreateComponent } from "../node-group-create/node-group-create.component";
import { ScalingRuleViewComponent } from "../scaling-rule-view/scaling-rule-view.component";

@Component({
  selector: 'app-node-group-dashboard',
  templateUrl: './node-group-dashboard.component.html',
  styleUrls: ['./node-group-dashboard.component.css']
})
export class NodeGroupDashboardComponent implements OnInit {

  group: NodeGroup | undefined = undefined;

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

  private load() {
    this.nodeGroupService.get(this.id).subscribe(
      group => this.group = group,
      error => alert(error?.error?.message ? error.error.message : 'Something wrong with node group loading on dashboard')
    )
  }

  async editGroup() {
    const createNodeGroupModal = this.modalService.open(NodeGroupCreateComponent);
    createNodeGroupModal.componentInstance.group = this.group;
    createNodeGroupModal.componentInstance.update = true;

    try {
      const group = await createNodeGroupModal.result;
      if (group) {
        this.nodeGroupService.update(this.id, group).subscribe(
          () => this.load(),
          error => alert(error?.error?.message ? error.error.message : 'Something wrong with node group loading on update'));
      }
    } catch (e) {
    }
  }

  async appendScalingRule() {
    try {
      const scalingRuleViewComponentModal = this.modalService.open(ScalingRuleViewComponent);

      try {
        let value = await scalingRuleViewComponentModal.result;
        console.log(value);
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

    description += ' ' + rule.action.resource.amount;

    if (rule.action.resource.value && rule.action.resource.value.length > 0) {
      description += ' (' + rule.action.resource.value + ')';
    }

    description += ' node(s) in ';

    if (rule.action.resource.provider === ComputingProvider.AWS) {
      description += ' AWS '
    }

    return description;
  }

  editScalingRule(rule: ScalingRule) {
    console.log('Edit scaling rule!');
  }

  updateScalingRuleEnablement(value, rule: ScalingRule) {
    if (value != rule.enabled) {
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
}
