import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgLocationEntity} from '../../../../../../../../../angular-classes/angular-entities/ng.location.entity';
import {BackendAdminService} from '../../../../../backend-admin.service';
import {ClientDeviceService} from '../../../../../../client-device/client-device.service';
import {NgApiEntity} from '../../../../../../../../../angular-classes/ng.api.entity';

@Component({
  selector: 'app-database-table-field-location-entry',
  templateUrl: './database-table-field-location-entry.component.html',
  styleUrls: ['./database-table-field-location-entry.component.scss']
})
export class DatabaseTableFieldLocationEntryComponent implements OnInit {

  @Input() entry?: NgApiEntity;
  @Input() fieldKey: string = 'locationId';
  @Input() layout = 'simple';
  @Input() label = 'Location';
  @Input() controls = false;
  @Input() locationId?: number;
  @Input() location?: NgLocationEntity;
  @Input() multiple = false;
  @Input() editable = true;
  @Input() edit = false;

  mapVisible = false;
  selectedLocation?: NgLocationEntity;
  editLocation?: NgLocationEntity;

  loading = false;
  ready = false;

  @Output() onChange = new EventEmitter<NgApiEntity>();
  showEditLocation = false;
  newLocation?: NgLocationEntity;
  markerSrc?: string;
  editMarkerSrc?: string;

  constructor(public adminService: BackendAdminService, public deviceService: ClientDeviceService) {

  }

  ngOnInit(): void {
    this.initNewLocation();
    this.initLocation();
    this.ready = true;
  }

  initNewLocation() {
    this.newLocation = new NgLocationEntity(this.adminService);
    if (this.edit && !this.location && !this.locationId) {
      this.setShowEditLocation();
    }
  }

  initLocation() {
    if (this.entry && this.fieldKey) {
      this.locationId = (this.entry as any)[this.fieldKey];
    }
    if (!this.location && this.locationId || (this.location && this.locationId && this.location.id !== this.locationId)) {
      this.location = this.adminService.apiData['location'].find((location: NgLocationEntity) => location.id === this.locationId);
      this.getDeviceCoordinates();
    } else if (!this.location) {
      this.addNewLocation();
    }
    this.getMarkerSource();
  }

  addNewLocation() {
    this.editLocation = new NgLocationEntity(this.adminService);
    this.getDeviceCoordinates();
    this.initNewLocation();
  }

  getDeviceCoordinates() {
    if (this.editLocation) {
      if (this.deviceService.latitude) {
        this.editLocation.latitude = this.deviceService.latitude;
      }
      if (this.deviceService.longitude) {
        this.editLocation.longitude = this.deviceService.longitude;
      }
    }
  }

  saveLocation() {
    this.loading = true;
    if (this.editLocation) {
      if (this.editLocation.id) {
        this.editLocation.update(() => {
          this.editLocation = undefined;
          this.loading = false;
          this.onChange.emit(this.entry);
          this.initLocation();
        }, () => {
          this.loading = false;
        });
      } else {
        this.editLocation.add((result: any) => {
          if (result) {
            this.editLocation = new NgLocationEntity(this.adminService).setData(result);
            if (this.entry && this.fieldKey) {
              (this.entry as any)[this.fieldKey] = this.editLocation.id;
              this.entry.update(() => {
                this.editLocation = undefined;
                this.onChange.emit(this.entry);
                this.initLocation();
              });
            }
          }
          this.loading = false;
        }, () => {
          this.loading = false;
        });
      }
    }
  }

  setGeolocation(position: GeolocationPosition) {
    if (this.editLocation) {
      this.editLocation.latitude = position.coords.latitude;
      this.editLocation.longitude = position.coords.longitude;
      if (this.editLocation.id) {
        this.editLocation.update();
      }
    }
  }

  setShowEditLocation(showEditLocation = this.showEditLocation) {
    if (this.showEditLocation !== showEditLocation) {
      const mapVisible = this.mapVisible;
      this.mapVisible = false;
      this.showEditLocation = showEditLocation;
      setTimeout(() => {
        this.mapVisible = mapVisible;
      }, 0);
    }

  }

  selectLocationChange() {
    if (this.editLocation?.id) {
      this.saveLocation();
      this.location = this.editLocation;
      this.locationId = this.location.id;
      if (this.entry && this.fieldKey) {
        (this.entry as any)[this.fieldKey] = this.editLocation.id;
        this.entry.update(() => {
          this.editLocation = undefined;
          this.onChange.emit(this.entry);
          this.initLocation();
        });
      }
    } else {
      this.initNewLocation();
      this.setEditLocation();
      (this.entry as any)[this.fieldKey] = 0;
      this.onChange.emit(this.entry);
      this.initLocation();
    }
    this.getMarkerSource();
  }


  setEditLocation() {
    if (this.editable) {
      this.edit = true;
      if (this.location) {
        this.editLocation = this.location;
      }
    }
    this.getMarkerSource();
  }

  cancelEditLocation() {
    this.editLocation = undefined;
    this.edit = false;
  }

  toggleEditLocation() {
    if (this.edit) {
      this.cancelEditLocation();
    } else {
      this.setEditLocation();
    }
  }

  showMap() {
    this.initLocation();
    this.mapVisible = true;
  }

  hideMap() {
    this.mapVisible = false;
  }

  toggleMap() {
    if (this.mapVisible === true) {
      this.hideMap();
    } else {
      this.showMap();
    }
  }

  getMarkerSource() {
    this.markerSrc = undefined;
    setTimeout(() => {
      if (this.location && this.location.markerImageId) {
        const file = this.adminService.getFileById(this.location.markerImageId);
        this.markerSrc = this.adminService.filePath(file);
      }
      if (this.editLocation && this.editLocation.markerImageId) {
        const file = this.adminService.getFileById(this.editLocation.markerImageId);
        this.editMarkerSrc = this.adminService.filePath(file);
      }
      console.log('getMarkerSource', this.markerSrc, this.editMarkerSrc);
    }, 0);
  }

  toggleEditMap() {
    if (this.editable) {
      if (this.editLocation === this.location) {
        this.cancelEditMap();
      } else {
        this.editMap();
      }
    }
  }

  editMap() {
    if (this.editable) {
      this.setEditLocation();
      this.showMap();
    }
  }

  cancelEditMap() {
    this.edit = false;
  }
}
