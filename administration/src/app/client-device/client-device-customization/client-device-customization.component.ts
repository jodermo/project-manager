import { Component, OnInit } from '@angular/core';
import { ClientDeviceService } from '../client-device.service';
import { BackendAdminService } from '../../backend-admin/backend-admin.service';

@Component({
  selector: 'app-client-device-customization',
  templateUrl: './client-device-customization.component.html',
  styleUrls: ['./client-device-customization.component.scss']
})
export class ClientDeviceCustomizationComponent implements OnInit {

  constructor(public adminService: BackendAdminService, public clientDevice: ClientDeviceService) {
  }

  ngOnInit(): void {
  }

}
