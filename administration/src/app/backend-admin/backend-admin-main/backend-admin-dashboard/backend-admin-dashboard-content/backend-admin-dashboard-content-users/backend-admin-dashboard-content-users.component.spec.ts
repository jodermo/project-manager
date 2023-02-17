import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackendAdminDashboardContentUsersComponent } from './backend-admin-dashboard-content-users.component';

describe('BackendAdminDashboardContentUsersComponent', () => {
  let component: BackendAdminDashboardContentUsersComponent;
  let fixture: ComponentFixture<BackendAdminDashboardContentUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackendAdminDashboardContentUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackendAdminDashboardContentUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
