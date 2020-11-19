import { Injectable } from '@angular/core';
import { AuthService } from "./auth/auth.service";
import { Account, AccountService } from "./account.service";
import { Observable } from "rxjs";

@Injectable()
export class AccountHolderService {

  private account: Observable<Account>;

  constructor(private authService: AuthService,
              private accountService: AccountService) {
    this.authService.change
      .subscribe(() => this.load());
    this.load();
  }

  load() {
    if (this.authService.authenticated) {
      this.account = this.accountService.getMyAccount();
    }
  }

  getAccount(): Observable<Account> {
    return this.account;
  }
}
