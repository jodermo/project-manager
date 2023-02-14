import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlinePlatformAppPrivacyPageComponent } from './online-platform-app-privacy-page.component';

describe('OnlinePlatformAppPrivacyPageComponent', () => {
  let component: OnlinePlatformAppPrivacyPageComponent;
  let fixture: ComponentFixture<OnlinePlatformAppPrivacyPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnlinePlatformAppPrivacyPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlinePlatformAppPrivacyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
