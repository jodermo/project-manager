import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackendAdminDashboardComponent } from './backend-admin-dashboard.component';

describe('BackendAdminDashboardComponent', () => {
  let component: BackendAdminDashboardComponent;
  let fixture: ComponentFixture<BackendAdminDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackendAdminDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackendAdminDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
