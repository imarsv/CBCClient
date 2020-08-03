import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { StreamModule } from './stream/stream.module';
import { AuthComponent } from './security/auth/auth.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from './service/auth/auth.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { StreamsViewComponent } from './stream/streams-view/streams-view.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NodeViewComponent } from './node/node-view/node-view.component';
import { NodeModule } from './node/node.module';
import { NodeEditComponent } from './node/node-edit/node-edit.component';
import { StreamDashboardComponent } from './stream/stream-dashboard/stream-dashboard.component';
import { AccountModule } from './account/account.module';
import { AccountsViewComponent } from './account/accounts-view/accounts-view.component';
import { AuthGuardService } from './service/auth/auth-guard.service';
import { TokenInterceptor } from './service/auth/token-interceptor';
import { TranscodeDashboardComponent } from './stream/transcode-dashboard/transcode-dashboard.component';
import { StorageDashboardComponent } from './storage/storage-dashboard/storage-dashboard.component';
import { StorageModule } from './storage/storage.module';
import { StorageEditComponent } from './storage/storage-edit/storage-edit.component';
import { AccountBillDashboardComponent } from './billing/account-bill-dashboard/account-bill-dashboard.component';
import { StreamBillDashboardComponent } from './billing/stream-bill-dashboard/stream-bill-dashboard.component';
import { BillingModule } from './billing/billing.module';
import { NodeGroupsListComponent } from './node-group/node-groups-list/node-groups-list.component';
import { NodeGroupModule } from './node-group/node-group.module';

@NgModule({
  imports: [
    BrowserModule, FormsModule, HttpClientModule, NgbModule,
    AccountModule, NodeModule, NodeGroupModule, StreamModule, BillingModule, StorageModule,
    RouterModule.forRoot([
        {
          path: 'streams', component: StreamsViewComponent,
          canActivate: [AuthGuardService]
        },
        {
          path: 'streams/transcode/:id', pathMatch: 'full', component: TranscodeDashboardComponent,
          canActivate: [AuthGuardService]
        },
        {
          path: 'streams/:mode', component: StreamDashboardComponent,
          canActivate: [AuthGuardService]
        },
        {
          path: 'streams/:mode/:id', component: StreamDashboardComponent,
          canActivate: [AuthGuardService]
        },
        {
          path: 'billing/stream/:id', component: StreamBillDashboardComponent,
          canActivate: [AuthGuardService]
        },
        {
          path: 'billing/account/:id', component: AccountBillDashboardComponent,
          canActivate: [AuthGuardService]
        },
        {
          path: 'billing/account', component: AccountBillDashboardComponent,
          canActivate: [AuthGuardService]
        },
        {
          path: 'nodes', component: NodeViewComponent,
          canActivate: [AuthGuardService]
        },
        {
          path: 'nodes/:mode', component: NodeEditComponent,
          canActivate: [AuthGuardService]
        },
        {
          path: 'nodes/:mode/:id', component: NodeEditComponent,
          canActivate: [AuthGuardService]
        },
        {
          path: 'node-groups', component: NodeGroupsListComponent,
          canActivate: [AuthGuardService]
        },
        {
          path: 'storages', component: StorageDashboardComponent,
          canActivate: [AuthGuardService]
        },
        {
          path: 'storages/:mode', component: StorageEditComponent,
          canActivate: [AuthGuardService]
        },
        {
          path: 'storages/:mode/:id', component: StorageEditComponent,
          canActivate: [AuthGuardService]
        },
        {
          path: 'accounts', component: AccountsViewComponent,
          canActivate: [AuthGuardService]
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
  providers: [AuthService, AuthGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }],
  declarations: [AppComponent, AuthComponent, NavbarComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
