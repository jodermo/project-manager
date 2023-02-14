import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackendAdminDashboardContentAccountComponent } from './backend-admin-dashboard-content-account.component';

describe('BackendAdminDashboardContentAccountComponent', () => {
  let component: BackendAdminDashboardContentAccountComponent;
  let fixture: ComponentFixture<BackendAdminDashboardContentAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackendAdminDashboardContentAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackendAdminDashboardContentAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
