import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { BackendAdminService } from '../../../../../backend-admin.service';
import { NgLocationEntity } from '../../../../../../../../../angular-classes/angular-entities/ng.location.entity';
import { ClientDeviceService } from '../../../../../../client-device/client-device.service';

@Component({
  selector: 'app-edit-location',
  templateUrl: './edit-location.component.html',
  styleUrls: ['./edit-location.component.scss']
})
export class EditLocationComponent implements OnChanges {

  tabIndex = 0;
  loading = false;

  @Input() entry?: NgLocationEntity;

  minNameLength = 1;

  @Output() onSave = new EventEmitter<NgLocationEntity>();
  @Output() onDelete = new EventEmitter();
  editLocationLocation = false;
  mapVisible = true;

  constructor(public adminService: BackendAdminService, public clientDevice: ClientDeviceService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.reload();
  }

  reload(){
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 0);
  }

  valid() {
    if (this.entry) {
      return this.entry.name && this.entry.name.length > this.minNameLength;
    }
    return false;
  }

  addNew() {
    this.entry = new NgLocationEntity(this.adminService);
    this.entry.latitude = this.clientDevice.latitude ? this.clientDevice.latitude : this.entry.latitude;
    this.entry.longitude = this.clientDevice.longitude ? this.clientDevice.longitude : this.entry.longitude;
    this.tabIndex = 0;
  }

  editEntry(entry = this.entry) {
    this.entry = entry;
  }

  saveEntry() {
    if (this.valid() && this.entry) {
      this.loading = true;
      if (!this.entry.id) {
        this.entry.add((result: any) => {
          if (this.entry) {
            this.entry.setData(result);
          } else {
            this.entry = new NgLocationEntity(this.adminService).setData(result);
          }
          this.loading = false;
          this.reload();
          this.onSave.emit(this.entry);
        }, () => {
          this.loading = false;
        });
      } else {
        this.entry.update(() => {
          this.loading = false;
          this.reload();
          this.onSave.emit(this.entry);
        }, () => {
          this.loading = false;
        });
      }
    }
  }

  cancel() {
    this.entry = undefined;
  }

  setData(data: any) {
    if (this.entry) {
      this.entry.setData(data);
    }
  }

  setGeolocation(position: GeolocationPosition) {
    if (this.entry) {
      this.entry.latitude = position.coords.latitude;
      this.entry.longitude = position.coords.longitude;
    }
  }

  deleteEntry(entry = this.entry) {
    if (entry) {
      this.adminService.deleteEntry(entry, () => {
        this.onDelete.emit();
        this.reload();
      });
    }

  }

  toggleEdit() {
    this.mapVisible = false;
    this.editLocationLocation = !this.editLocationLocation;
    setTimeout(() => {
      this.mapVisible = true;
    }, 250);
  }
}
