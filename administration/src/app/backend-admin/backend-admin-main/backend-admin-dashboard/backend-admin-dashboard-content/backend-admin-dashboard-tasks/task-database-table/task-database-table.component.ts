import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BackendAdminService } from '../../../../../backend-admin.service';
import { DatabaseTableComponent } from '../../../../../backend-admin-components/database/database-table/database-table.component';
import { NgTaskEntity } from '../../../../../../../../../angular-classes/angular-entities/ng.task.entity';
import { NgPoiEntity } from '../../../../../../../../../angular-classes/angular-entities/ng.poi.entity';

@Component({
  selector: 'app-task-database-table',
  templateUrl: './task-database-table.component.html',
  styleUrls: ['./task-database-table.component.scss']
})
export class TaskDatabaseTableComponent extends DatabaseTableComponent {
  @Input() entries?: NgTaskEntity[];
  renderData: NgTaskEntity[] = [];
  @Input() task?: NgTaskEntity;
  @Input() poi?: NgPoiEntity;

  apiRoute = 'task';

  @Output() onSave = new EventEmitter<NgTaskEntity>();
  @Output() onDelete = new EventEmitter();

  constructor(public adminService: BackendAdminService) {
    super(adminService);
  }


  loadAllEntries() {
    this.initData(this.adminService.apiData['task']);

  }
}
