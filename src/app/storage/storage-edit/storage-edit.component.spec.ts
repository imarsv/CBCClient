import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageEditComponent } from './storage-edit.component';

describe('StorageEditComponent', () => {
  let component: StorageEditComponent;
  let fixture: ComponentFixture<StorageEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StorageEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorageEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
