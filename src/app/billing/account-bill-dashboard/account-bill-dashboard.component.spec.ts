import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountBillDashboardComponent } from './account-bill-dashboard.component';

describe('AccountBillDashboardComponent', () => {
  let component: AccountBillDashboardComponent;
  let fixture: ComponentFixture<AccountBillDashboardComponent>;

  beforeEach(async(() => {
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
