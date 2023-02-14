import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlinePlatformHeaderComponent } from './online-platform-header.component';

describe('OnlinePlatformHeaderComponent', () => {
  let component: OnlinePlatformHeaderComponent;
  let fixture: ComponentFixture<OnlinePlatformHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnlinePlatformHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlinePlatformHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
