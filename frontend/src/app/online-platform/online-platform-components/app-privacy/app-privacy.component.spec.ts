import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppPrivacyComponent } from './app-privacy.component';

describe('AppPrivacyComponent', () => {
  let component: AppPrivacyComponent;
  let fixture: ComponentFixture<AppPrivacyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppPrivacyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppPrivacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
