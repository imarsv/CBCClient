import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AccountBillDashboardComponent } from './account-bill-dashboard.component';

describe('AccountBillDashboardComponent', () => {
  let component: AccountBillDashboardComponent;
  let fixture: ComponentFixture<AccountBillDashboardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountBillDashboardComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountBillDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
