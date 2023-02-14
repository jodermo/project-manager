import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientDeviceUserAgentComponent } from './client-device-user-agent.component';

describe('ClientDeviceUserAgentComponent', () => {
  let component: ClientDeviceUserAgentComponent;
  let fixture: ComponentFixture<ClientDeviceUserAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientDeviceUserAgentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientDeviceUserAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
