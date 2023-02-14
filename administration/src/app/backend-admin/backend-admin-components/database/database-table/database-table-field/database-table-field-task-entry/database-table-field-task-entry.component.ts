import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgApiEntity } from '../../../../../../../../../angular-classes/ng.api.entity';
import { NgTaskEntity } from '../../../../../../../../../angular-classes/angular-entities/ng.task.entity';
import { BackendAdminService } from '../../../../../backend-admin.service';
import { ClientDeviceService } from '../../../../../../client-device/client-device.service';

@Component({
  selector: 'app-database-table-field-task-entry',
  templateUrl: './database-table-field-task-entry.component.html',
  styleUrls: ['./database-table-field-task-entry.component.scss']
})
export class DatabaseTableFieldTaskEntryComponent implements OnInit {

  @Input() entry?: NgApiEntity;
  @Input() fieldKey: string = 'taskId';
  @Input() taskId?: number;
  @Input() task?: NgTaskEntity;

  editTask?: NgTaskEntity;

  loading = false;
  ready = false;

  @Output() onChange = new EventEmitter<NgApiEntity>();


  constructor(public adminService: BackendAdminService, public deviceService: ClientDeviceService) {
  }

  ngOnInit(): void {
    this.initTask();
    this.ready = true;
  }

  initTask() {
    if (this.entry && this.fieldKey) {
      this.taskId = (this.entry as any)[this.fieldKey];
    }
    if (!this.task && this.taskId) {
      this.task = this.adminService.apiData['task'].find((task: NgTaskEntity) => task.id === this.taskId);
    } else if (!this.task) {
      this.addNewTask();
    }
  }

  addNewTask() {
    this.editTask = new NgTaskEntity(this.adminService);
  }

  saveTask() {
    this.loading = true;
    if (this.editTask) {
      if (this.editTask.id) {
        this.editTask.update(() => {
          this.editTask = undefined;
          this.loading = false;
          this.onChange.emit(this.entry);
          this.initTask();
        }, () => {
          this.loading = false;
        });
      } else {
        this.editTask.add((result: any) => {
          if (result) {
            this.editTask = new NgTaskEntity(this.adminService).setData(result);
            if (this.entry && this.fieldKey) {
              (this.entry as any)[this.fieldKey] = this.editTask.id;
              this.entry.update(() => {
                this.editTask = undefined;
                this.onChange.emit(this.entry);
                this.initTask();
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
}
