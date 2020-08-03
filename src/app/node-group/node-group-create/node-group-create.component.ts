import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Account } from '../../service/account.service';
import { NodeGroup } from '../../service/node-group.service';

@Component({
  selector: 'app-node-group-create',
  templateUrl: './node-group-create.component.html',
  styleUrls: ['./node-group-create.component.css']
})
export class NodeGroupCreateComponent implements OnInit {

  form: FormGroup;

  constructor(public activeModal: NgbActiveModal,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(255)]],
      description: ['', [Validators.maxLength(16384)]],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.activeModal.close(this.form.value as NodeGroup);
    }
  }
}
