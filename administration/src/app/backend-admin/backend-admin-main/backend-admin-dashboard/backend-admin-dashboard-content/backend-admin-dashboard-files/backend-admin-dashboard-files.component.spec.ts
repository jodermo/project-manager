import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackendAdminDashboardFilesComponent } from './backend-admin-dashboard-files.component';

describe('BackendAdminDashboardFilesComponent', () => {
  let component: BackendAdminDashboardFilesComponent;
  let fixture: ComponentFixture<BackendAdminDashboardFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackendAdminDashboardFilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackendAdminDashboardFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
