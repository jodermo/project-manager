import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlinePlatformAppConditionsPageComponent } from './online-platform-app-conditions-page.component';

describe('OnlinePlatformAppConditionsPageComponent', () => {
  let component: OnlinePlatformAppConditionsPageComponent;
  let fixture: ComponentFixture<OnlinePlatformAppConditionsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnlinePlatformAppConditionsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlinePlatformAppConditionsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
