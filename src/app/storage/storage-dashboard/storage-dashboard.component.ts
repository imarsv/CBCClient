import { Component, OnInit } from '@angular/core';
import { AmazonS3Storage, Storage, StorageService, StorageType } from '../../service/storage.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-storage-dashboard',
  templateUrl: './storage-dashboard.component.html',
  styleUrls: ['./storage-dashboard.component.css']
})
export class StorageDashboardComponent implements OnInit {

  storages: Observable<Storage[]>;

  constructor(private storageService: StorageService) { }

  ngOnInit(): void {
    const compareString = (a: string, b: string) => {
      if (a < b) {
        return 1;
      } else if (a > b) {
        return -1;
      }
      return 0;
    };

    this.storages = this.storageService.list().pipe(tap(results => {
      results.sort((a, b) => compareString(a.name, b.name));
    }));
  }

  getUserFriendlyStorageType(storage: Storage) {
    switch (storage.type) {
      case StorageType.AmazonS3:
        return 'S3';
      case StorageType.AmazonS3Compatible:
        return 'S3 Compatible';
      default:
        return '?';
    }
  }

  getUserFriendlyLocation(storage: Storage) {
    switch (storage.type) {
      case StorageType.AmazonS3:
      case StorageType.AmazonS3Compatible:
        const s3Storage = <AmazonS3Storage>storage;
        return `${s3Storage.bucket}:${s3Storage.path || ''}`;
      default:
        return '?';
    }
  }
}
