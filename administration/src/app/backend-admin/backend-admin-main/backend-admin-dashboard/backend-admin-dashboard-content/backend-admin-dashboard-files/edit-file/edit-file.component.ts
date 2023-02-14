import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DatabaseEditEntryComponent } from '../../../../../backend-admin-components/database/database-edit-entry/database-edit-entry.component';
import { NgFileEntity } from '../../../../../../../../../angular-classes/angular-entities/ng.file.entity';

@Component({
  selector: 'app-edit-file',
  templateUrl: './edit-file.component.html',
  styleUrls: ['./edit-file.component.scss']
})
export class EditFileComponent extends DatabaseEditEntryComponent {
  @Input() parentFieldKey: string = 'fileId';

  @Input() entry?: NgFileEntity;

  minNameLength = 1;

  @Output() onSave = new EventEmitter<NgFileEntity>();
  @Output() onDelete = new EventEmitter();

  valid() {
    if (this.entry) {
      return this.entry.name && this.entry.name.length > this.minNameLength;
      return super.valid();
    }
    return false;
  }

  addNew() {
    this.entry = new NgFileEntity(this.adminService);
    this.tabIndex = 0;
  }


  deleteEntry(entry = this.entry) {
    if (entry) {
      this.adminService.deleteFile(entry, () => {
        this.onDelete.emit();
      });
    }
  }
}
