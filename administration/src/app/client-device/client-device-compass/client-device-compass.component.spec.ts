import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientDeviceCompassComponent } from './client-device-compass.component';

describe('ClientDeviceCompassComponent', () => {
  let component: ClientDeviceCompassComponent;
  let fixture: ComponentFixture<ClientDeviceCompassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientDeviceCompassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientDeviceCompassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
