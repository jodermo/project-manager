import { Component, OnInit } from '@angular/core';
import { ClientDeviceService } from '../client-device.service';

@Component({
  selector: 'app-client-device-user-agent',
  templateUrl: './client-device-user-agent.component.html',
  styleUrls: ['./client-device-user-agent.component.scss']
})
export class ClientDeviceUserAgentComponent implements OnInit {

  constructor(public clientDevice: ClientDeviceService) { }

  ngOnInit(): void {
  }

}
