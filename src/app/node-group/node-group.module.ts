import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NodeGroupService } from '../service/node-group.service';
import { NodeGroupsListComponent } from './node-groups-list/node-groups-list.component';
import { NodeGroupCreateComponent } from './node-group-create/node-group-create.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [NodeGroupsListComponent, NodeGroupCreateComponent],
  providers: [NodeGroupService],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [NodeGroupsListComponent]
})
export class NodeGroupModule {}
