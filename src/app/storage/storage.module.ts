import { NgModule } from '@angular/core';
import { StorageDashboardComponent } from './storage-dashboard/storage-dashboard.component';
import { RouterModule } from '@angular/router';
import { StorageService } from '../service/storage.service';
import { CommonModule } from '@angular/common';
import { StorageEditComponent } from './storage-edit/storage-edit.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [StorageDashboardComponent, StorageEditComponent],
  providers: [StorageService],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  exports: [StorageDashboardComponent, StorageEditComponent]
})
export class StorageModule {}
