import { Component, OnInit } from '@angular/core';
import { ClientDeviceService } from '../client-device.service';

@Component({
  selector: 'app-client-device-orientation',
  templateUrl: './client-device-orientation.component.html',
  styleUrls: ['./client-device-orientation.component.scss']
})
export class ClientDeviceOrientationComponent implements OnInit {

  constructor(public clientDevice: ClientDeviceService) {
  }

  ngOnInit() {
  }


  value(value: number) {
    return value.toFixed(2);
  }
}
