import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountStatisticsDashboardComponent } from './account-statistics-dashboard.component';

describe('AccountStatisticsDashboardComponent', () => {
  let component: AccountStatisticsDashboardComponent;
  let fixture: ComponentFixture<AccountStatisticsDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountStatisticsDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountStatisticsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
