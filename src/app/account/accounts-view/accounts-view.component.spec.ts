import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AccountsViewComponent } from './accounts-view.component';

describe('AccountsViewComponent', () => {
  let component: AccountsViewComponent;
  let fixture: ComponentFixture<AccountsViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountsViewComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
