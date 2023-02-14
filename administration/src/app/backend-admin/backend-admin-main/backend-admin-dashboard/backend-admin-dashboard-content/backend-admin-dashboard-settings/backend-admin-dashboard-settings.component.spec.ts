import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackendAdminDashboardSettingsComponent } from './backend-admin-dashboard-settings.component';

describe('BackendAdminDashboardSettingsComponent', () => {
  let component: BackendAdminDashboardSettingsComponent;
  let fixture: ComponentFixture<BackendAdminDashboardSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackendAdminDashboardSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackendAdminDashboardSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
