import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackendAdminDashboardContentTasksComponent } from './backend-admin-dashboard-content-tasks.component';

describe('BackendAdminDashboardContentTasksComponent', () => {
  let component: BackendAdminDashboardContentTasksComponent;
  let fixture: ComponentFixture<BackendAdminDashboardContentTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackendAdminDashboardContentTasksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackendAdminDashboardContentTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
