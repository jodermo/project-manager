import { Component, OnInit } from '@angular/core';
import { ClientDeviceService } from '../client-device.service';
import { OnlinePlatformService } from '../../online-platform/online-platform.service';

@Component({
  selector: 'app-client-device-customization',
  templateUrl: './client-device-customization.component.html',
  styleUrls: ['./client-device-customization.component.scss']
})
export class ClientDeviceCustomizationComponent implements OnInit {

  constructor(public platform: OnlinePlatformService, public clientDevice: ClientDeviceService) {
  }

  ngOnInit(): void {
  }

}
