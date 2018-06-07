import { Component } from '@angular/core';

@Component({
  selector: 'app',
  template: `
    <app-navbar></app-navbar>
    <div class="container">
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {
}
