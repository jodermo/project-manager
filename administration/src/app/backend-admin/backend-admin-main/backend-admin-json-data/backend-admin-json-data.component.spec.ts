import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackendAdminJsonDataComponent } from './backend-admin-json-data.component';

describe('BackendAdminJsonDataComponent', () => {
  let component: BackendAdminJsonDataComponent;
  let fixture: ComponentFixture<BackendAdminJsonDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackendAdminJsonDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackendAdminJsonDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
