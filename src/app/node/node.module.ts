import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NodeViewComponent } from './node-view/node-view.component';
import { NodeListComponent } from './node-list/node-list.component';
import { NodeEditComponent } from './node-edit/node-edit.component';
import { StreamService } from '../service/stream.service';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule, RouterModule
  ],
  providers: [StreamService],
  declarations: [NodeListComponent, NodeEditComponent, NodeViewComponent],
  exports: [NodeViewComponent, NodeEditComponent]
})
export class NodeModule {}
