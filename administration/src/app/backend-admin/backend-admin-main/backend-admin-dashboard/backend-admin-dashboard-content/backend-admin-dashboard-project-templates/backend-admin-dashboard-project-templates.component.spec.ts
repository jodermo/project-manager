import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackendAdminDashboardProjectTemplatesComponent } from './backend-admin-dashboard-project-templates.component';

describe('BackendAdminDashboardProjectTemplatesComponent', () => {
  let component: BackendAdminDashboardProjectTemplatesComponent;
  let fixture: ComponentFixture<BackendAdminDashboardProjectTemplatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackendAdminDashboardProjectTemplatesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackendAdminDashboardProjectTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
