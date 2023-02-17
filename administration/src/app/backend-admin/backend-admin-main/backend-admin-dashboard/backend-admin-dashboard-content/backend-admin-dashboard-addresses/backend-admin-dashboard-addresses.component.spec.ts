import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackendAdminDashboardAddressesComponent } from './backend-admin-dashboard-addresses.component';

describe('BackendAdminDashboardAddressesComponent', () => {
  let component: BackendAdminDashboardAddressesComponent;
  let fixture: ComponentFixture<BackendAdminDashboardAddressesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackendAdminDashboardAddressesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackendAdminDashboardAddressesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
