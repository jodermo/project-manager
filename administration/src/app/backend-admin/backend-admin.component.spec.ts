import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackendAdminComponent } from './backend-admin.component';

describe('BackendAdminComponent', () => {
  let component: BackendAdminComponent;
  let fixture: ComponentFixture<BackendAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackendAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackendAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
