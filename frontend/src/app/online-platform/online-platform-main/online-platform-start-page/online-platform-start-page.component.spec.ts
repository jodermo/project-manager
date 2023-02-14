import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlinePlatformStartPageComponent } from './online-platform-start-page.component';

describe('OnlinePlatformStartPageComponent', () => {
  let component: OnlinePlatformStartPageComponent;
  let fixture: ComponentFixture<OnlinePlatformStartPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnlinePlatformStartPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlinePlatformStartPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
