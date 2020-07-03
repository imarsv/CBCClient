import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AmazonS3Storage, Storage, StorageService, StorageType } from '../../service/storage.service';
import { Recording, RecordingService, RecordingState } from '../../service/recording.service';

@Component({
  selector: 'app-stream-recording-info',
  templateUrl: './stream-recording-info.component.html',
  styleUrls: ['./stream-recording-info.component.css']
})
export class StreamRecordingInfoComponent implements OnInit {

  @Input() streamId: string;

  recordingState = RecordingState;

  recording: Recording | undefined;
  storage: Storage | undefined;

  constructor(public activeModal: NgbActiveModal,
              private recordingService: RecordingService,
              private storageService: StorageService) { }

  ngOnInit(): void {
    this.recordingService.get(this.streamId)
      .subscribe(recording => {
        this.recording = recording;
        this.storageService.get(recording.storageId)
          .subscribe(storage => this.storage = storage);
      });
  }

  getDestination() {
    return `${this.getStorageDestination()}${this.recording?.fileName}.${this.recording?.fileFormat.toLowerCase()}`;
  }

  private getStorageDestination() {
    if (this.storage) {
      if ((this.storage.type === StorageType.AmazonS3) ||
        (this.storage.type === StorageType.AmazonS3Compatible)) {
        const s3Storage = <AmazonS3Storage>this.storage;
        return `${s3Storage.bucket}:${s3Storage.path ? s3Storage.path + '/' : ''}`;
      }
    }

    return '';
  }
}
