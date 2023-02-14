import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { NgMemoEntity } from '../../../../../../../../../angular-classes/angular-entities/ng.memo.entity';
import { BackendAdminService } from '../../../../../backend-admin.service';
import { DatabaseEditEntryComponent } from '../../../../../backend-admin-components/database/database-edit-entry/database-edit-entry.component';
import { NgTaskEntity } from '../../../../../../../../../angular-classes/angular-entities/ng.task.entity';
import { NgPoiEntity } from '../../../../../../../../../angular-classes/angular-entities/ng.poi.entity';
import { DatabaseTableFieldPoiEntryComponent } from '../../../../../backend-admin-components/database/database-table/database-table-field/database-table-field-poi-entry/database-table-field-poi-entry.component';

@Component({
  selector: 'app-edit-memo',
  templateUrl: './edit-memo.component.html',
  styleUrls: ['./edit-memo.component.scss']
})
export class EditMemoComponent extends DatabaseEditEntryComponent implements OnChanges {
  @ViewChild('poiField', {static: false}) poiField?: DatabaseTableFieldPoiEntryComponent;

  tabIndex = 0;
  loading = false;

  @Input() entry?: NgMemoEntity;
  minTitleLength = 1;

  @Output() onSave = new EventEmitter<NgMemoEntity>();
  @Output() onDelete = new EventEmitter();
  ready = false;

  constructor(public adminService: BackendAdminService) {
    super(adminService);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.updateParent();
  }

  updateParent() {
    this.ready = false;
    if(this.parentEntry){
      this.adminService.updateEntry(this.parentEntry);
    }
    if(this.entry?.taskIds){
      for(const taskId of this.entry.taskIds){
        this.adminService.updateEntry(this.adminService.apiData['task'].find((task: NgTaskEntity) => task.id === taskId));
      }
    }
    if(this.entry?.poiId){
        this.adminService.updateEntry(this.adminService.apiData['poi'].find((poi: NgPoiEntity) => poi.id === this.entry?.poiId));
    }
    setTimeout(() => {
      this.ready = true;
    }, 0);
  }

  valid() {
    if (this.entry) {
      return this.entry.title && this.entry.title.length > this.minTitleLength;
    }
    return false;
  }

  addNew(taskId?: number, poiId?: number) {
    this.entry = new NgMemoEntity(this.adminService);
    if(poiId){
      this.entry.poiId = poiId;
    }
    if(taskId){
      this.entry.taskIds = [taskId];
    }
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
            this.entry = new NgMemoEntity(this.adminService).setData(result);
          }
          this.loading = false;
          this.updateParent();
          this.onSave.emit(this.entry);
        }, () => {
          this.loading = false;
        });
      } else {
        this.entry.update(() => {
          this.loading = false;
          this.updateParent();
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

  deleteEntry(entry = this.entry) {
    if (entry) {
      this.adminService.deleteEntry(entry, () => {
        this.onDelete.emit();
        this.updateParent();
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
