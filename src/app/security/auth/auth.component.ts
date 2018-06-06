import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  public username: string;
  public password: string;
  public errorMessage: string;

  constructor(private router: Router, private auth: AuthService) {
  }

  authenticate(form: NgForm) {
    if (form.valid) {
      const authenticated = this.auth.authenticate(this.username, this.password);
      if (authenticated) {
        this.router.navigateByUrl('/streams');
      } else {
        this.errorMessage = 'Invalid credentials';
      }
    } else {
      this.errorMessage = 'Form data invalid';
    }
  }

}
