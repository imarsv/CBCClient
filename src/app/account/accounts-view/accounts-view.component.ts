import { Component, OnInit } from '@angular/core';
import { Account, AccountService } from '../../service/account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-accounts-view',
  templateUrl: './accounts-view.component.html',
  styleUrls: ['./accounts-view.component.css']
})
export class AccountsViewComponent implements OnInit {

  accounts?: Account[];

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
              private accountService: AccountService, private authService: AuthService) {
    this.accountService.list().subscribe(data => this.accounts = data);
  }

  ngOnInit() {
  }

  async impersonate(id: string) {
    const success = await this.authService.impersonate(id);
    if (success) {
      this.router.navigateByUrl('/');
    }
  }
}
