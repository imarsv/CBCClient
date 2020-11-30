import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NodeListComponent } from './node-list/node-list.component';
import { NodeEditComponent } from './node-edit/node-edit.component';
import { StreamService } from '../service/stream.service';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxFilesizeModule } from 'ngx-filesize';

@NgModule({
  imports: [
    CommonModule, RouterModule, FormsModule, ReactiveFormsModule, NgxFilesizeModule
  ],
  providers: [StreamService],
  declarations: [NodeListComponent, NodeEditComponent],
  exports: [NodeEditComponent, NodeListComponent]
})
export class NodeModule {}
