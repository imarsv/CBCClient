import { Component, OnInit } from '@angular/core';
import { Account, Role } from '../../service/account.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.css']
})
export class AccountEditComponent implements OnInit {

  role = Role;

  errorMessage?: string;

  form: FormGroup;

  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: [Role.USER],
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.form.valid) {
      this.activeModal.close(this.form.value as Account);
    } else {
      this.errorMessage = 'Invalid!';
    }
  }
}
