import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  public username: string;
  public password: string;
  public errorMessage: string;

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
              private authService: AuthService) {
  }

  async authenticate(form: NgForm) {
    if (form.valid) {
      const authenticated = await this.authService.authenticate(this.username, this.password);
      if (authenticated) {
        this.router.navigateByUrl('/');
      } else {
        this.errorMessage = 'Invalid credentials';
      }
    } else {
      this.errorMessage = 'Form data invalid';
    }
  }
}
