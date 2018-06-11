import { Component, OnInit } from '@angular/core';
import { Account, AccountService, Role } from '../service/account.service';
import { AuthService } from '../service/auth.service';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  isCollapsed = true;

  role = Role;
  account?: Account;
  impersonated = false;

  constructor(private router: Router,
              private authService: AuthService, private accountService: AccountService) {
  }

  ngOnInit() {
    this.load();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.isCollapsed = true;
      }
    });
    this.authService.change.subscribe(() => this.load());
  }

  load() {
    if (this.authService.impersonated) {
      this.impersonated = true;
    }

    if (this.authService.authenticated) {
      this.accountService.getMyAccount()
        .subscribe(data => this.account = data);
    } else {
      this.account = null;
      this.router.navigateByUrl('/login');
    }
  }

  unimpersonate() {
    this.authService.unimpersonate();
    this.router.navigate(['/streams'], { queryParams: { refresh: true } });
  }

  logout() {
    this.authService.clear();
  }
}
