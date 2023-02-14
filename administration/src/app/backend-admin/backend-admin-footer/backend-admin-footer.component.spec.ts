import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackendAdminFooterComponent } from './backend-admin-footer.component';

describe('BackendAdminFooterComponent', () => {
  let component: BackendAdminFooterComponent;
  let fixture: ComponentFixture<BackendAdminFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackendAdminFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackendAdminFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
