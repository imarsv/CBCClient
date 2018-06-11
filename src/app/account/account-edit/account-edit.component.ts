import { Component, OnInit } from '@angular/core';
import { Account, Role } from '../../service/account.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.css']
})
export class AccountEditComponent implements OnInit {

  role = Role;

  errorMessage?: string;

  username?: string;
  password?: string;
  userRole = Role.USER;

  constructor(private activeModal: NgbActiveModal) {
  }

  ngOnInit() {
  }

  create() {
    if (!this.username || !this.password) {
      this.errorMessage = 'Username or password are empty!';
      return;
    }

    this.activeModal.close(this.getAccount());
  }

  getAccount(): Account {
    const account = <Account>{};
    account.username = this.username;
    account.password = this.password;
    account.role = this.userRole;

    return account;
  }
}
