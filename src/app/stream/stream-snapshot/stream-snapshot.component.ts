import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnapshotFormatType, SnapshotQualityType, SnapshotService, StreamSnapshot } from '../../service/snapshot.service';

@Component({
  selector: 'app-stream-snapshot',
  templateUrl: './stream-snapshot.component.html',
  styleUrls: ['./stream-snapshot.component.css']
})
export class StreamSnapshotComponent implements OnInit {

  form: FormGroup;
  snapshotFormat = SnapshotFormatType;
  snapshotQuality = SnapshotQualityType;

  @Input() incoming: StreamSnapshot;
  @Input() outgoing: StreamSnapshot;

  constructor(public activeModal: NgbActiveModal,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    const incomingEnabledControl = this.fb.control(false, [Validators.required]);
    incomingEnabledControl.valueChanges.subscribe(enabled => this.updateAvailability('incoming', enabled));
    const formIncoming = this.fb.group({
      format: [SnapshotFormatType.JPEG, [Validators.required]],
      quality: [SnapshotQualityType.Medium, [Validators.required]],
      interval: [5, [Validators.required, Validators.min(1), Validators.max(30)]],
    });

    const outgoingEnabledControl = this.fb.control(false, [Validators.required]);
    outgoingEnabledControl.valueChanges.subscribe(enabled => this.updateAvailability('outgoing', enabled));
    const formOutgoing = this.fb.group({
      format: [SnapshotFormatType.JPEG, [Validators.required]],
      quality: [SnapshotQualityType.Medium, [Validators.required]],
      interval: [5, [Validators.required, Validators.min(1), Validators.max(30)]],
    });

    this.form = this.fb.group({
      incomingEnabled: incomingEnabledControl,
      incoming: formIncoming,
      outgoingEnabled: outgoingEnabledControl,
      outgoing: formOutgoing,
    });

    if (this.incoming) {
      formIncoming.setValue(this.incoming);
    }
    incomingEnabledControl.setValue(this.incoming !== null);

    if (this.outgoing) {
      formOutgoing.setValue(this.outgoing);
    }
    outgoingEnabledControl.setValue(this.outgoing !== null);

    this.updateAvailability('incoming', incomingEnabledControl.value);
    this.updateAvailability('outgoing', outgoingEnabledControl.value);
  }

  getSettings() {
    if (this.form.valid) {
      const settings = {
        incoming: null,
        outgoing: null,
      };
      if (this.form.value.incomingEnabled) {
        settings.incoming = this.form.value.incoming;
      }
      if (this.form.value.outgoingEnabled) {
        settings.outgoing = this.form.value.outgoing;
      }
      return settings;
    }

    return undefined;
  }

  private updateAvailability(controls: string, enabled: boolean) {
    const group = this.form.controls[controls];
    if (enabled) {
      group.enable();
    } else {
      group.disable();
    }
  }
}
