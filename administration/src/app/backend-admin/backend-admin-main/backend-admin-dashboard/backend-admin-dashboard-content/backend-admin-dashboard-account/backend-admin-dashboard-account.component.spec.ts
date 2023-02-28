import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackendAdminDashboardAccountComponent } from './backend-admin-dashboard-account.component';

describe('BackendAdminDashboardAccountComponent', () => {
  let component: BackendAdminDashboardAccountComponent;
  let fixture: ComponentFixture<BackendAdminDashboardAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackendAdminDashboardAccountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackendAdminDashboardAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
