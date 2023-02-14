import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackendAdminDashboardAttributesComponent } from './backend-admin-dashboard-attributes.component';

describe('BackendAdminDashboardAttributesComponent', () => {
  let component: BackendAdminDashboardAttributesComponent;
  let fixture: ComponentFixture<BackendAdminDashboardAttributesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackendAdminDashboardAttributesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackendAdminDashboardAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
