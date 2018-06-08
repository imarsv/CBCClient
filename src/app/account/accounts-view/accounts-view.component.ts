import { Component, OnInit } from '@angular/core';
import { Account, AccountService } from '../../service/account.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-accounts-view',
  templateUrl: './accounts-view.component.html',
  styleUrls: ['./accounts-view.component.css']
})
export class AccountsViewComponent implements OnInit {

  accounts?: Account[];

  constructor(private accountService: AccountService,
              private router: Router, private activatedRoute: ActivatedRoute) {
    this.accountService.list().subscribe(data => this.accounts = data);
  }

  ngOnInit() {
  }

}
