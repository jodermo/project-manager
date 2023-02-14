import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BackendAdminService } from '../../backend-admin.service';
import { ClientDeviceService } from '../../../client-device/client-device.service';

@Component({
  selector: 'app-get-client-location',
  templateUrl: './get-client-location.component.html',
  styleUrls: ['./get-client-location.component.scss']
})
export class GetClientLocationComponent implements OnInit {

  @Input() confirm = false;
  position?: GeolocationPosition;
  error?: GeolocationPositionError;
  @Output() onGetGeolocation = new EventEmitter<GeolocationPosition>();
  @Output() onErrorGeolocation = new EventEmitter<GeolocationPositionError>();

  loading = false;

  constructor(public adminService: BackendAdminService, public clientDevice: ClientDeviceService) {

  }

  ngOnInit(): void {
  }

  getGeolocation() {
    if (!this.confirm || confirm(this.adminService.text('You really want to set your own location?'))) {
      this.loading = true;
      this.clientDevice.getGeoLocation((position: GeolocationPosition) => {
        this.position = position;
        this.onGetGeolocation.emit(position);
        this.loading = false;
      }, (error: GeolocationPositionError) => {
        this.error = error;
        this.onErrorGeolocation.emit(error);
        this.loading = false;
      });
    }
  }

}
