import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackendAdminDashboardLocationsComponent } from './backend-admin-dashboard-locations.component';

describe('BackendAdminDashboardLocationsComponent', () => {
  let component: BackendAdminDashboardLocationsComponent;
  let fixture: ComponentFixture<BackendAdminDashboardLocationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackendAdminDashboardLocationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackendAdminDashboardLocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
