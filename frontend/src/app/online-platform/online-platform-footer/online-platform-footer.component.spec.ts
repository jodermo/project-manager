import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlinePlatformFooterComponent } from './online-platform-footer.component';

describe('OnlinePlatformFooterComponent', () => {
  let component: OnlinePlatformFooterComponent;
  let fixture: ComponentFixture<OnlinePlatformFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnlinePlatformFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlinePlatformFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
