import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserCompanyComponent } from './edit-user-company.component';

describe('EditUserCompanyComponent', () => {
  let component: EditUserCompanyComponent;
  let fixture: ComponentFixture<EditUserCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditUserCompanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUserCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
