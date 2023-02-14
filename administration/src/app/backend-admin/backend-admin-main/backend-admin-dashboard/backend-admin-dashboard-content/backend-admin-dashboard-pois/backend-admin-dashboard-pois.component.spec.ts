import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackendAdminDashboardPoisComponent } from './backend-admin-dashboard-pois.component';

describe('BackendAdminDashboardPoisComponent', () => {
  let component: BackendAdminDashboardPoisComponent;
  let fixture: ComponentFixture<BackendAdminDashboardPoisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackendAdminDashboardPoisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackendAdminDashboardPoisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
