import { Component, OnInit } from '@angular/core';
import { Account, AccountService, Role } from '../service/account.service';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  role = Role;
  account?: Account;

  constructor(private router: Router,
              private authService: AuthService, private accountService: AccountService) {
  }

  ngOnInit() {
    this.load();
    this.authService.change.subscribe(() => this.load());
  }

  load() {
    if (this.authService.authenticated) {
      this.accountService.getMyAccount()
        .subscribe(data => this.account = data);
    } else {
      this.account = null;
      this.router.navigateByUrl('/login');
    }
  }

  logout() {
    this.authService.clear();
  }
}
