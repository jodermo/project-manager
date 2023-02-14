import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientDeviceOrientationComponent } from './client-device-orientation.component';

describe('ClientDeviceOrientationComponent', () => {
  let component: ClientDeviceOrientationComponent;
  let fixture: ComponentFixture<ClientDeviceOrientationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientDeviceOrientationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientDeviceOrientationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
