import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppConditionsComponent } from './app-conditions.component';

describe('AppConditionsComponent', () => {
  let component: AppConditionsComponent;
  let fixture: ComponentFixture<AppConditionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppConditionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppConditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
