import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgPoiEntity} from '../../../../../../../../../angular-classes/angular-entities/ng.poi.entity';
import {BackendAdminService} from '../../../../../backend-admin.service';
import {ClientDeviceService} from '../../../../../../client-device/client-device.service';
import {NgApiEntity} from '../../../../../../../../../angular-classes/ng.api.entity';

@Component({
  selector: 'app-database-table-field-poi-entry',
  templateUrl: './database-table-field-poi-entry.component.html',
  styleUrls: ['./database-table-field-poi-entry.component.scss']
})
export class DatabaseTableFieldPoiEntryComponent implements OnInit {

  @Input() entry?: NgApiEntity;
  @Input() fieldKey: string = 'poiId';
  @Input() layout = 'simple';
  @Input() label = 'Location';
  @Input() controls = false;
  @Input() poiId?: number;
  @Input() poi?: NgPoiEntity;
  @Input() multiple = false;
  @Input() editable = true;
  @Input() edit = false;

  mapVisible = false;
  selectedPoi?: NgPoiEntity;
  editPoi?: NgPoiEntity;

  loading = false;
  ready = false;

  @Output() onChange = new EventEmitter<NgApiEntity>();
  editLocation = false;
  newPoi?: NgPoiEntity;
  markerSrc?: string;
  editMarkerSrc?: string;

  constructor(public adminService: BackendAdminService, public deviceService: ClientDeviceService) {

  }

  ngOnInit(): void {
    this.initNewPoi();
    this.initPoi();
    this.ready = true;
  }

  initNewPoi() {
    this.newPoi = new NgPoiEntity(this.adminService);
    if (this.edit && !this.poi && !this.poiId) {
      this.setEditPoi();
    }
  }

  initPoi() {
    if (this.entry && this.fieldKey) {
      this.poiId = (this.entry as any)[this.fieldKey];
    }
    if (!this.poi && this.poiId || (this.poi && this.poiId && this.poi.id !== this.poiId)) {
      this.poi = this.adminService.apiData['poi'].find((poi: NgPoiEntity) => poi.id === this.poiId);
      this.getDeviceCoordinates();
    } else if (!this.poi) {
      this.addNewPoi();
    }
    this.getMarkerSource();
  }

  addNewPoi() {
    this.editPoi = new NgPoiEntity(this.adminService);
    this.getDeviceCoordinates();
    this.initNewPoi();
  }

  getDeviceCoordinates() {
    if (this.editPoi) {
      if (this.deviceService.latitude) {
        this.editPoi.latitude = this.deviceService.latitude;
      }
      if (this.deviceService.longitude) {
        this.editPoi.longitude = this.deviceService.longitude;
      }
    }
  }

  savePoi() {
    this.loading = true;
    if (this.editPoi) {
      if (this.editPoi.id) {
        this.editPoi.update(() => {
          this.editPoi = undefined;
          this.loading = false;
          this.onChange.emit(this.entry);
          this.initPoi();
        }, () => {
          this.loading = false;
        });
      } else {
        this.editPoi.add((result: any) => {
          if (result) {
            this.editPoi = new NgPoiEntity(this.adminService).setData(result);
            if (this.entry && this.fieldKey) {
              (this.entry as any)[this.fieldKey] = this.editPoi.id;
              this.entry.update(() => {
                this.editPoi = undefined;
                this.onChange.emit(this.entry);
                this.initPoi();
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
    if (this.editPoi) {
      this.editPoi.latitude = position.coords.latitude;
      this.editPoi.longitude = position.coords.longitude;
      if (this.editPoi.id) {
        this.editPoi.update();
      }
    }
  }

  setEditLocation(editLocation = this.editLocation) {
    if (this.editLocation !== editLocation) {
      const mapVisible = this.mapVisible;
      this.mapVisible = false;
      this.editLocation = editLocation;
      setTimeout(() => {
        this.mapVisible = mapVisible;
      }, 0);
    }

  }

  selectPoiChange() {
    if (this.editPoi?.id) {
      this.savePoi();
      this.poi = this.editPoi;
      this.poiId = this.poi.id;
      if (this.entry && this.fieldKey) {
        (this.entry as any)[this.fieldKey] = this.editPoi.id;
        this.entry.update(() => {
          this.editPoi = undefined;
          this.onChange.emit(this.entry);
          this.initPoi();
        });
      }
    } else {
      this.initNewPoi();
      this.setEditPoi();
      (this.entry as any)[this.fieldKey] = 0;
      this.onChange.emit(this.entry);
      this.initPoi();
    }
    this.getMarkerSource();
  }


  setEditPoi() {
    if (this.editable) {
      this.edit = true;
      if (this.poi) {
        this.editPoi = this.poi;
      }
    }
    this.getMarkerSource();
  }

  cancelEditPoi() {
    this.editPoi = undefined;
    this.edit = false;
  }

  toggleEditPoi() {
    if (this.edit) {
      this.cancelEditPoi();
    } else {
      this.setEditPoi();
    }
  }

  showMap() {
    this.initPoi();
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
      if (this.poi && this.poi.markerImageId) {
        const file = this.adminService.getFileById(this.poi.markerImageId);
        this.markerSrc = this.adminService.filePath(file);
      }
      if (this.editPoi && this.editPoi.markerImageId) {
        const file = this.adminService.getFileById(this.editPoi.markerImageId);
        this.editMarkerSrc = this.adminService.filePath(file);
      }
      console.log('getMarkerSource', this.markerSrc, this.editMarkerSrc);
    }, 0);
  }

  toggleEditMap() {
    if (this.editable) {
      if (this.editPoi === this.poi) {
        this.cancelEditMap();
      } else {
        this.editMap();
      }
    }
  }

  editMap() {
    if (this.editable) {
      this.setEditPoi();
      this.showMap();
    }
  }

  cancelEditMap() {
    this.edit = false;
  }
}
