import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackendAdminHeaderComponent } from './backend-admin-header.component';

describe('BackendAdminHeaderComponent', () => {
  let component: BackendAdminHeaderComponent;
  let fixture: ComponentFixture<BackendAdminHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackendAdminHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackendAdminHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
