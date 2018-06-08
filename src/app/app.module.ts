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
import { NodeModule } from './node/node.module';
import { NodeEditComponent } from './node/node-edit/node-edit.component';
import { StreamDashboardComponent } from './stream/stream-dashboard/stream-dashboard.component';
import { StreamStatisticsDashboardComponent } from './statistics/stream-statistics-dashboard/stream-statistics-dashboard.component';
import { StatisticsModule } from './statistics/statistics.module';
import { AccountModule } from './account/account.module';
import { AccountsViewComponent } from './account/accounts-view/accounts-view.component';
import { AccountStatisticsDashboardComponent } from './statistics/account-statistics-dashboard/account-statistics-dashboard.component';

@NgModule({
  imports: [
    BrowserModule, FormsModule, HttpClientModule, AccountModule, NodeModule, StreamModule, StatisticsModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
        {
          path: 'streams', component: StreamsViewComponent,
          canActivate: [FirstGuard]
        },
        {
          path: 'streams/:mode', component: StreamDashboardComponent,
          canActivate: [FirstGuard]
        },
        {
          path: 'streams/:mode/:id', component: StreamDashboardComponent,
          canActivate: [FirstGuard]
        },
        {
          path: 'statistics/stream/:id', component: StreamStatisticsDashboardComponent,
          canActivate: [FirstGuard]
        },
        {
          path: 'statistics/account/:id', component: AccountStatisticsDashboardComponent,
          canActivate: [FirstGuard]
        },
        {
          path: 'nodes', component: NodeViewComponent,
          canActivate: [FirstGuard]
        },
        {
          path: 'nodes/:mode', component: NodeEditComponent,
          canActivate: [FirstGuard]
        },
        {
          path: 'nodes/:mode/:id', component: NodeEditComponent,
          canActivate: [FirstGuard]
        },
        {
          path: 'accounts', component: AccountsViewComponent,
          canActivate: [FirstGuard]
        },
        {
          path: 'login', component: AuthComponent
        },
        { path: '**', redirectTo: '/streams' }
      ],
      {
        // enableTracing: true,
        useHash: true,
      }
    )
  ],
  providers: [FirstGuard, AuthService],
  declarations: [AppComponent, AuthComponent, NavbarComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
