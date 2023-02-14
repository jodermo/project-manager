import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlinePlatformComponent } from './online-platform.component';

describe('OnlinePlatformComponent', () => {
  let component: OnlinePlatformComponent;
  let fixture: ComponentFixture<OnlinePlatformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnlinePlatformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlinePlatformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
