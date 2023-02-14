import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackendAdminMainComponent } from './backend-admin-main.component';

describe('BackendAdminMainComponent', () => {
  let component: BackendAdminMainComponent;
  let fixture: ComponentFixture<BackendAdminMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackendAdminMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackendAdminMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
