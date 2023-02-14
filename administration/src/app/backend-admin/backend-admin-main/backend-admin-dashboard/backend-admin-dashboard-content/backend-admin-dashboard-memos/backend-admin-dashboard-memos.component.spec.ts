import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackendAdminDashboardMemosComponent } from './backend-admin-dashboard-memos.component';

describe('BackendAdminDashboardMemosComponent', () => {
  let component: BackendAdminDashboardMemosComponent;
  let fixture: ComponentFixture<BackendAdminDashboardMemosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackendAdminDashboardMemosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackendAdminDashboardMemosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
