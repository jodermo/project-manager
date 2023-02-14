import { Component, OnInit } from '@angular/core';
import { OnlinePlatformService } from '../../online-platform.service';
import { ClientDeviceService } from '../../../client-device/client-device.service';

@Component({
  selector: 'app-device-settings',
  templateUrl: './device-settings.component.html',
  styleUrls: ['./device-settings.component.scss']
})
export class DeviceSettingsComponent implements OnInit {

  constructor(public platform: OnlinePlatformService, public clientDevice: ClientDeviceService) {
  }

  ngOnInit(): void {
  }

  updateDeviceRotation(value: number) {
    this.clientDevice.customRotation.rotation = value;
    this.clientDevice.update();
    return value;
  }
}
