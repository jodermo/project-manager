import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BackendAdminService } from '../../../backend-admin.service';
import { NgApiEntity } from '../../../../../../../angular-classes/ng.api.entity';

export class DatabaseEditEntryAttribute {
  field: string = '';
  name: string = '';
}

@Component({
  selector: 'app-database-edit-entry',
  templateUrl: './database-edit-entry.component.html',
  styleUrls: ['./database-edit-entry.component.scss']
})
export class DatabaseEditEntryComponent {
  @Input() parentEntry?: NgApiEntity;
  @Input() parentFieldKey: string = 'parentId';
  @Input() multiple = false;
  @Input() apiRoute?: string;
  @Input() editAttributes: DatabaseEditEntryAttribute[] = [];
  tabIndex = 0;
  loading = false;

  @Input() entry?: NgApiEntity | any;
  @Output() onEntrySaved = new EventEmitter<NgApiEntity | any>();
  @Output() onClose = new EventEmitter();

  constructor(public adminService: BackendAdminService) {
  }

  valid(): any {
    return true;
  }

  addNew(taskId?: number, poiId?: number) {
    if (this.apiRoute) {
      this.entry = new NgApiEntity(this.apiRoute, this.adminService);
      if (taskId) {
        this.entry.taskIds = [taskId];
      }
      if (poiId) {
        this.entry.poiId = poiId;
      }
      this.tabIndex = 0;
    }
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
          } else if (this.apiRoute) {
            this.entry = new NgApiEntity(this.apiRoute, this.adminService).setData(result);
          }
          this.loading = false;
        }, () => {
          this.loading = false;
        });
      } else {
        this.entry.update(() => {
          this.loading = false;
        }, () => {
          this.loading = false;
        });
      }
    }
  }

  cancel() {
    this.entry = undefined;
    this.adminService.editUser = undefined;
    this.onClose.emit();
  }

  setData(data: any) {
    if (this.entry && data) {
      this.entry.setData(data);
    }
  }
}
