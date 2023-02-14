import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackendAdminDashboardCompaniesComponent } from './backend-admin-dashboard-companies.component';

describe('BackendAdminDashboardCompaniesComponent', () => {
  let component: BackendAdminDashboardCompaniesComponent;
  let fixture: ComponentFixture<BackendAdminDashboardCompaniesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackendAdminDashboardCompaniesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackendAdminDashboardCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
