import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackendAdminDashboardUserRolesComponent } from './backend-admin-dashboard-user-roles.component';

describe('BackendAdminDashboardUserRolesComponent', () => {
  let component: BackendAdminDashboardUserRolesComponent;
  let fixture: ComponentFixture<BackendAdminDashboardUserRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackendAdminDashboardUserRolesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackendAdminDashboardUserRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
