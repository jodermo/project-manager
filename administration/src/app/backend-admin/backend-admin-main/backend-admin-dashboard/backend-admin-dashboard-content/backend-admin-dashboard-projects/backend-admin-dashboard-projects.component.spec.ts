import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackendAdminDashboardProjectsComponent } from './backend-admin-dashboard-projects.component';

describe('BackendAdminDashboardProjectsComponent', () => {
  let component: BackendAdminDashboardProjectsComponent;
  let fixture: ComponentFixture<BackendAdminDashboardProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackendAdminDashboardProjectsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackendAdminDashboardProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
