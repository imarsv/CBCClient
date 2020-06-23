import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileFormat, Recording, SourceType } from '../../service/recording.service';
import { Storage, StorageService } from '../../service/storage.service';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-stream-recording',
  templateUrl: './stream-recording.component.html',
  styleUrls: ['./stream-recording.component.css']
})
export class StreamRecordingComponent implements OnInit {

  form: FormGroup;
  fileFormat = FileFormat;

  @Input() streamId: string;

  storages: Observable<Storage[]>;

  constructor(public activeModal: NgbActiveModal,
              private storageService: StorageService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      streamId: [this.streamId, [Validators.required, Validators.maxLength(255)]],
      fileName: [this.generateFileName(), [Validators.required, Validators.maxLength(255)]],
      fileFormat: [FileFormat.MKV, [Validators.required]],
      sourceType: [SourceType.Output, [Validators.required]],
      storageId: [null, [Validators.required]],
    });

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

  getOutput() {
    if (this.form.valid) {
      return this.form.value as Recording;
    }
    return undefined;
  }

  onSubmit() {

  }

  private generateFileName() {
    return `${this.streamId}-${(new Date()).toISOString()}`;
  }
}
