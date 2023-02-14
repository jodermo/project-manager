import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlinePlatformSidebarComponent } from './online-platform-sidebar.component';

describe('OnlinePlatformSidebarComponent', () => {
  let component: OnlinePlatformSidebarComponent;
  let fixture: ComponentFixture<OnlinePlatformSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnlinePlatformSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlinePlatformSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
