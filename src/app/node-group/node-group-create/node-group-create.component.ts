import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AssignmentType, NodeGroup } from '../../service/node-group.service';

@Component({
  selector: 'app-node-group-create',
  templateUrl: './node-group-create.component.html',
  styleUrls: ['./node-group-create.component.css']
})
export class NodeGroupCreateComponent implements OnInit {

  @Input() group: NodeGroup | undefined = undefined;
  @Input() editing = false;

  form: FormGroup;

  assignmentType = AssignmentType;

  constructor(public activeModal: NgbActiveModal,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [this.group?.name || '', [Validators.required, Validators.maxLength(255)]],
      description: [this.group?.description || '', [Validators.maxLength(16384)]],
      assignment: [AssignmentType.Common, [Validators.required]],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.activeModal.close(this.form.value as NodeGroup);
    }
  }
}
