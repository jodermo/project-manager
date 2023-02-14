import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientDeviceCustomizationComponent } from './client-device-customization.component';

describe('ClientDeviceCustomizationComponent', () => {
  let component: ClientDeviceCustomizationComponent;
  let fixture: ComponentFixture<ClientDeviceCustomizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientDeviceCustomizationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientDeviceCustomizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
