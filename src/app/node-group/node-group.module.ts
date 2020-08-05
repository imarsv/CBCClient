import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from "@angular/router";
import { NgbButtonsModule } from "@ng-bootstrap/ng-bootstrap";
import { NgToggleModule } from '@nth-cloud/ng-toggle';
import { NodeGroupService } from '../service/node-group.service';
import { NodeGroupCreateComponent } from './node-group-create/node-group-create.component';
import { NodeGroupDashboardComponent } from './node-group-dashboard/node-group-dashboard.component';
import { NodeGroupsListComponent } from './node-groups-list/node-groups-list.component';
import { ScalingRuleViewComponent } from './scaling-rule-view/scaling-rule-view.component';

@NgModule({
  declarations: [NodeGroupsListComponent, NodeGroupCreateComponent, NodeGroupDashboardComponent, ScalingRuleViewComponent],
  providers: [NodeGroupService],
  imports: [CommonModule, ReactiveFormsModule, RouterModule, NgToggleModule, NgbButtonsModule, FormsModule],
  exports: [NodeGroupsListComponent, NodeGroupDashboardComponent]
})
export class NodeGroupModule {}
