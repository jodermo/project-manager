import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackendAdminDashboardContentDashboardComponent } from './backend-admin-dashboard-content-dashboard.component';

describe('BackendAdminDashboardContentDashboardComponent', () => {
  let component: BackendAdminDashboardContentDashboardComponent;
  let fixture: ComponentFixture<BackendAdminDashboardContentDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackendAdminDashboardContentDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackendAdminDashboardContentDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
