import { AfterViewInit, Component, Input } from '@angular/core';
import { ClientDeviceService } from '../client-device.service';

@Component({
  selector: 'app-client-device-compass',
  templateUrl: './client-device-compass.component.html',
  styleUrls: ['./client-device-compass.component.scss']
})
export class ClientDeviceCompassComponent implements AfterViewInit {
  @Input() arrow = false;

  constructor(public clientDevice: ClientDeviceService) {

  }

  ngAfterViewInit() {
  }

}
