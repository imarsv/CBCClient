import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FirstGuard } from './first.guard';
import { RouterModule } from '@angular/router';
import { StreamModule } from './stream/stream.module';
import { AuthComponent } from './security/auth/auth.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from './service/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { StreamsViewComponent } from './stream/streams-view/streams-view.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NodeViewComponent } from './node/node-view/node-view.component';
import { NodeModule } from './node/node/node.module';

@NgModule({
  imports: [
    BrowserModule, FormsModule, HttpClientModule, StreamModule, NodeModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
      {
        path: 'streams', component: StreamsViewComponent,
        canActivate: [FirstGuard]
      },
      {
        path: 'nodes', component: NodeViewComponent,
        canActivate: [FirstGuard]
      },
      {
        path: 'login', component: AuthComponent
      },
      { path: '**', redirectTo: '/login' }
    ])
  ],
  providers: [FirstGuard, AuthService],
  declarations: [AppComponent, AuthComponent, NavbarComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
