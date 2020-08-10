import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from './API';

export enum ScalingConditionMetricType {
  CPUGroupAvg = 'CPUGroupAvg',
  BWGroupAvg = 'BWGroupAvg',
}

export enum ScalingConditionType {
  Liner = 'Liner'
}

export class ScalingConditionLinerSettings {
  type: ScalingConditionType;
  comparison: ScalingComparisonType;
  value: number;
  duration: number;
}

export class ScalingCondition {
  metric: ScalingConditionMetricType;
  settings: ScalingConditionLinerSettings;
}

export enum ScalingComparisonType {
  More = 'More',
  Less = 'Less',
}

export class ScalingConditionCPUGroupAvg extends ScalingCondition {
  comparison: ScalingComparisonType;
  value: number;
  duration: number;
}

export class ScalingConditionBWGroupAvg extends ScalingCondition {
  comparison: ScalingComparisonType;
  value: number;
  duration: number;
}

export class ScalingActionSettings {
  public type: ScalingActionType;
}

export enum ComputingProvider {
  AWS = 'AWS',
  GCP = 'GCP',
}

export class ScalingActionIncreaseSettings extends ScalingActionSettings {
  public provider: ComputingProvider;
  public value: string;
  public amount: number;
}

export class ScalingActionReduceSettings extends ScalingActionSettings {
  public amount: number;
}

export class ComputingResource {
  provider: ComputingProvider;
  value: string;
  amount: number;
}

export enum ScalingActionType {
  Increase = 'Increase',
  Reduce = 'Reduce',
}

export class ScalingAction {
  type: ScalingActionType;
  settings: ScalingActionIncreaseSettings | ScalingActionReduceSettings;
}

export class ScalingRule {
  id: string;
  condition: ScalingCondition;
  action: ScalingAction;
  actionTimeout: number;
  enabled: boolean;
}

export enum ResourceType {
  Persistent = 'Persistent',
  Allocated = 'Allocated',
}

export class ComputingResourceNodeModel {
  public name: string;
  public hostname: string;
  public enabled: boolean;
}

export class NodeGroupResource {
  public id: string;
  public type: ResourceType;
  public node: ComputingResourceNodeModel;
  public containerId: string;
}

export class NodeGroup {
  id: string;
  name: string;
  description: string;
  scalingRules: ScalingRule[];
  resources: NodeGroupResource[];
  scalable: boolean;
}

@Injectable()
export class NodeGroupService {

  constructor(private httpClient: HttpClient) {
  }

  add(group: NodeGroup) {
    return this.httpClient
      .post<NodeGroup>(`${API.endpoint()}/node-groups`, group);
  }

  get(id: string) {
    return this.httpClient
      .get<NodeGroup>(`${API.endpoint()}/node-groups/${id}`);
  }

  update(id: string, group: NodeGroup) {
    return this.httpClient
      .put<NodeGroup>(`${API.endpoint()}/node-groups/${id}`, group);
  }

  list() {
    return this.httpClient
      .get<NodeGroup[]>(`${API.endpoint()}/node-groups`);
  }

  addScalingRule(id: string, rule: ScalingRule) {
    return this.httpClient
      .post<ScalingRule>(`${API.endpoint()}/node-groups/${id}/scaling-rule`, rule);
  }

  updateScalingRule(groupId: string, ruleId: string, rule: ScalingRule) {
    return this.httpClient
      .put<ScalingRule>(`${API.endpoint()}/node-groups/${groupId}/scaling-rule/${ruleId}`, rule);
  }

  removeScalingRule(groupId: string, ruleId: string) {
    return this.httpClient
      .delete(`${API.endpoint()}/node-groups/${groupId}/scaling-rule/${ruleId}`);
  }
}
