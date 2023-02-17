import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackendAdminDashboardDataComponent } from './backend-admin-dashboard-data.component';

describe('BackendAdminDashboardDataComponent', () => {
  let component: BackendAdminDashboardDataComponent;
  let fixture: ComponentFixture<BackendAdminDashboardDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackendAdminDashboardDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackendAdminDashboardDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
