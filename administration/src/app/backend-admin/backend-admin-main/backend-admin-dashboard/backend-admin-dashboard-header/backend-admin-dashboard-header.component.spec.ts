import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackendAdminDashboardHeaderComponent } from './backend-admin-dashboard-header.component';

describe('BackendAdminDashboardHeaderComponent', () => {
  let component: BackendAdminDashboardHeaderComponent;
  let fixture: ComponentFixture<BackendAdminDashboardHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackendAdminDashboardHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackendAdminDashboardHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
