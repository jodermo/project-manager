import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlinePlatformMainComponent } from './online-platform-main.component';

describe('OnlinePlatformMainComponent', () => {
  let component: OnlinePlatformMainComponent;
  let fixture: ComponentFixture<OnlinePlatformMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnlinePlatformMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlinePlatformMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
