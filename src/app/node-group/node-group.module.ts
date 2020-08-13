import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbButtonsModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgToggleModule } from '@nth-cloud/ng-toggle';
import { NodeGroupService } from '../service/node-group.service';
import { NodeGroupCreateComponent } from './node-group-create/node-group-create.component';
import { NodeGroupDashboardComponent } from './node-group-dashboard/node-group-dashboard.component';
import { NodeGroupsListComponent } from './node-groups-list/node-groups-list.component';
import { ScalingRuleViewComponent } from './scaling-rule-view/scaling-rule-view.component';
import { NodeListViewComponent } from './node-list-view/node-list-view.component';

@NgModule({
  declarations: [NodeGroupsListComponent, NodeGroupCreateComponent, NodeGroupDashboardComponent, ScalingRuleViewComponent,
    NodeListViewComponent],
  providers: [NodeGroupService],
  imports: [CommonModule, ReactiveFormsModule, RouterModule, NgToggleModule, NgbButtonsModule, FormsModule, NgbDropdownModule],
  exports: [NodeGroupsListComponent, NodeGroupDashboardComponent]
})
export class NodeGroupModule {}
