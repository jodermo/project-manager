import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackendAdminDashboardTeamsComponent } from './backend-admin-dashboard-teams.component';

describe('BackendAdminDashboardTeamsComponent', () => {
  let component: BackendAdminDashboardTeamsComponent;
  let fixture: ComponentFixture<BackendAdminDashboardTeamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackendAdminDashboardTeamsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackendAdminDashboardTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
