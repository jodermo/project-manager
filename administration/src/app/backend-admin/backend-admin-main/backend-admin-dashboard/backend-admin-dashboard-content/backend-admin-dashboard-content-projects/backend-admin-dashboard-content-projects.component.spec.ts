import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackendAdminDashboardContentProjectsComponent } from './backend-admin-dashboard-content-projects.component';

describe('BackendAdminDashboardContentProjectsComponent', () => {
  let component: BackendAdminDashboardContentProjectsComponent;
  let fixture: ComponentFixture<BackendAdminDashboardContentProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackendAdminDashboardContentProjectsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackendAdminDashboardContentProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
