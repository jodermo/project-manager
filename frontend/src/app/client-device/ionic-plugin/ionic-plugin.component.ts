import { Component } from '@angular/core';
import { ClientDeviceService } from '../client-device.service';

@Component({
  selector: 'app-ionic-plugin',
  template: ''
})
export class IonicPluginComponent {
  constructor(public clientDevice: ClientDeviceService) {
    // this.clientDevice.initIonic();
  }

}
