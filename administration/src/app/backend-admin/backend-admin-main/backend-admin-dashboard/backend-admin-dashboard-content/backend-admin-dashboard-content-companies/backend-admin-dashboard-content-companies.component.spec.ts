import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackendAdminDashboardContentCompaniesComponent } from './backend-admin-dashboard-content-companies.component';

describe('BackendAdminDashboardContentCompaniesComponent', () => {
  let component: BackendAdminDashboardContentCompaniesComponent;
  let fixture: ComponentFixture<BackendAdminDashboardContentCompaniesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackendAdminDashboardContentCompaniesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackendAdminDashboardContentCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
