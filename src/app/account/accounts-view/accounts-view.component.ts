import { Component, OnInit } from '@angular/core';
import { Account, AccountService } from '../../service/account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../service/auth/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountEditComponent } from '../account-edit/account-edit.component';
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

@Component({
  selector: 'app-accounts-view',
  templateUrl: './accounts-view.component.html',
  styleUrls: ['./accounts-view.component.css']
})
export class AccountsViewComponent implements OnInit {

  accounts: Observable<Account[]>;

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
              private authService: AuthService, private accountService: AccountService,
              private modalService: NgbModal) {
    this.load();
  }

  ngOnInit() {
  }

  load() {
    this.accounts = this.accountService.list()
      .pipe(map(list => list.sort((a, b) => a.username.localeCompare(b.username))))
  }

  async impersonate(id: string) {
    const success = await this.authService.impersonate(id);
    if (success) {
      this.router.navigateByUrl('/');
    }
  }

  async newAccount() {
    const ngbModal = this.modalService.open(AccountEditComponent);

    try {
      const account = await ngbModal.result;
      if (account) {
        try {
          await this.accountService.add(account).toPromise();
          this.load();
        } catch (e) {
          alert(e);
        }
      }
    } catch (e) {
    }
  }
}
