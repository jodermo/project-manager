import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackendAdminDashboardUserGroupsComponent } from './backend-admin-dashboard-user-groups.component';

describe('BackendAdminDashboardUserGroupsComponent', () => {
  let component: BackendAdminDashboardUserGroupsComponent;
  let fixture: ComponentFixture<BackendAdminDashboardUserGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackendAdminDashboardUserGroupsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackendAdminDashboardUserGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
