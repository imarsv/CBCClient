import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StorageDashboardComponent } from './storage-dashboard.component';

describe('StorageDashboardComponent', () => {
  let component: StorageDashboardComponent;
  let fixture: ComponentFixture<StorageDashboardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StorageDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorageDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
