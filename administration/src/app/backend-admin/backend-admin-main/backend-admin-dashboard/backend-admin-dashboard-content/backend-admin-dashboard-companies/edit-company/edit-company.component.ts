import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import {
  DatabaseEditEntryComponent
} from '../../../../../backend-admin-components/database/database-edit-entry/database-edit-entry.component';
import {NgCompanyEntity} from '../../../../../../../../../angular-classes/angular-entities/ng.company.entity';
import {
  DatabaseTableFieldLocationEntryComponent
} from '../../../../../backend-admin-components/database/database-table/database-table-field/database-table-field-location-entry/database-table-field-location-entry.component';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.scss']
})
export class EditCompanyComponent extends DatabaseEditEntryComponent {
  @ViewChild('locationField', {static: false}) locationField?: DatabaseTableFieldLocationEntryComponent;

  @Input() parentFieldKey: string = 'companyId';
  @Input() entry?: NgCompanyEntity;
  minNameLength = 1;

  @Output() onSave = new EventEmitter<NgCompanyEntity>();
  @Output() onDelete = new EventEmitter();

  valid() {
    if (this.entry) {
      return this.entry.name && this.entry.name.length > this.minNameLength;
      return super.valid();
    }
    return false;
  }

  addNew() {
    this.entry = new NgCompanyEntity(this.adminService);
    this.tabIndex = 0;
  }

  saveEntry() {
    if (this.valid() && this.entry) {
      this.loading = true;
      if (!this.entry.id) {
        this.entry.add((result: any) => {
          if (this.entry) {
            this.entry.setData(result);
          } else {
            this.entry = new NgCompanyEntity(this.adminService).setData(result);
          }
          this.loading = false;
          this.onSave.emit(this.entry);
        }, () => {
          this.loading = false;
        });
      } else {
        console.log('saveEntry');
        try {
          this.entry.update((result: any) => {
            this.loading = false;
            this.onSave.emit(this.entry);
          }, () => {
            this.loading = false;
          });
        } catch (error: any) {
          console.log('saveEntry error', error);

        }

      }
    }
  }


  deleteEntry(entry: NgCompanyEntity) {
    if (entry) {
      this.adminService.deleteEntry(entry, () => {
        this.onDelete.emit();
      });
    }
  }


  toggleLocationMap() {
    if (this.locationField) {
      this.locationField.toggleMap();
    }
  }

  editLocationMap() {
    if (this.locationField) {
      this.locationField.toggleEditLocation();
    }
  }
}
