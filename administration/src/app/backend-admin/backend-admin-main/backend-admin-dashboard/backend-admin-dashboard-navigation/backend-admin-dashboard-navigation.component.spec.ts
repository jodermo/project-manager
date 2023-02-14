import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackendAdminDashboardNavigationComponent } from './backend-admin-dashboard-navigation.component';

describe('BackendAdminDashboardNavigationComponent', () => {
  let component: BackendAdminDashboardNavigationComponent;
  let fixture: ComponentFixture<BackendAdminDashboardNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackendAdminDashboardNavigationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackendAdminDashboardNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
