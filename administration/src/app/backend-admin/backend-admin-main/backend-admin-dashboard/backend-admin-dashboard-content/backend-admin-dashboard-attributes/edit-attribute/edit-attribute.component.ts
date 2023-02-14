import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {
  DatabaseEditEntryComponent
} from '../../../../../backend-admin-components/database/database-edit-entry/database-edit-entry.component';
import {
  DatabaseTableFieldPoiEntryComponent
} from '../../../../../backend-admin-components/database/database-table/database-table-field/database-table-field-poi-entry/database-table-field-poi-entry.component';
import {
  NgAttributeEntity
} from "../../../../../../../../../angular-classes/angular-entities/ng.attribute.entity";

@Component({
  selector: 'app-edit-attribute',
  templateUrl: './edit-attribute.component.html',
  styleUrls: ['./edit-attribute.component.scss']
})
export class EditAttributeComponent extends DatabaseEditEntryComponent {
  @ViewChild('poiField', {static: false}) poiField?: DatabaseTableFieldPoiEntryComponent;

  @Input() parentFieldKey: string = 'productId';
  @Input() entry?: NgAttributeEntity;
  minKeyLength = 1;

  @Output() onSave = new EventEmitter<NgAttributeEntity>();
  @Output() onDelete = new EventEmitter();

  ngOnInit() {

  }

  valid() {
    if (this.entry) {
      return this.entry.key && this.entry.key.length > this.minKeyLength;
      return super.valid();
    }
    return false;
  }

  addNew() {
    this.entry = new NgAttributeEntity(this.adminService);
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
            this.entry = new NgAttributeEntity(this.adminService).setData(result);
          }
          this.loading = false;
          this.onSave.emit(this.entry);
        }, () => {
          this.loading = false;
        });
      } else {
        this.entry.update((result: any) => {
          this.loading = false;
          if (this.entry) {
            this.entry.setData(result)
          }
          this.onSave.emit(this.entry);
        }, () => {
          this.loading = false;
        });
      }
    }
  }


  deleteEntry(entry: NgAttributeEntity) {
    if (entry) {
      this.adminService.deleteEntry(entry, () => {
        this.onDelete.emit();
      });
    }
  }


  togglePoiMap() {
    if (this.poiField) {
      this.poiField.toggleMap();
    }
  }

  editPoiMap() {
    if (this.poiField) {
      this.poiField.toggleEditPoi();
    }
  }
}
