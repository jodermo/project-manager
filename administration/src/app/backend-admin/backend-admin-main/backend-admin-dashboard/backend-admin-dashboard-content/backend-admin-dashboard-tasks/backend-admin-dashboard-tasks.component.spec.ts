import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackendAdminDashboardTasksComponent } from './backend-admin-dashboard-tasks.component';

describe('BackendAdminDashboardTasksComponent', () => {
  let component: BackendAdminDashboardTasksComponent;
  let fixture: ComponentFixture<BackendAdminDashboardTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackendAdminDashboardTasksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackendAdminDashboardTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
