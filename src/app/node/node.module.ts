import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NodeViewComponent } from './node-view/node-view.component';
import { NodeListComponent } from './node-list/node-list.component';
import { NodeEditComponent } from './node-edit/node-edit.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NodeListComponent, NodeEditComponent, NodeViewComponent],
  exports: [NodeViewComponent]
})
export class NodeModule { }
