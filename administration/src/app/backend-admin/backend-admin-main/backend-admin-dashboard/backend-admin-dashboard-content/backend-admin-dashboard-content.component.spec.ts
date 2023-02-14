import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackendAdminDashboardContentComponent } from './backend-admin-dashboard-content.component';

describe('BackendAdminDashboardContentComponent', () => {
  let component: BackendAdminDashboardContentComponent;
  let fixture: ComponentFixture<BackendAdminDashboardContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackendAdminDashboardContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackendAdminDashboardContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
