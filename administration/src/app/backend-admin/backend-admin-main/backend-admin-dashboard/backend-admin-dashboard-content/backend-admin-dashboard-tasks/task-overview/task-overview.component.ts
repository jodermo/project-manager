import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { BackendAdminService } from '../../../../../backend-admin.service';
import { TaskDatabaseTableComponent } from '../task-database-table/task-database-table.component';
import { EditTaskComponent } from '../edit-task/edit-task.component';
import { DatabaseOverviewComponent } from '../../../../../backend-admin-components/database/database-overview/database-overview.component';
import { NgTaskEntity } from '../../../../../../../../../angular-classes/angular-entities/ng.task.entity';
import { DatabaseEditEntryComponent } from '../../../../../backend-admin-components/database/database-edit-entry/database-edit-entry.component';
import { DatabaseTableComponent } from '../../../../../backend-admin-components/database/database-table/database-table.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { NgLocationEntity } from '../../../../../../../../../angular-classes/angular-entities/ng.location.entity';
import { NgApiEntity } from '../../../../../../../../../angular-classes/ng.api.entity';

@Component({
  selector: 'app-task-overview',
  templateUrl: './task-overview.component.html',
  styleUrls: ['./task-overview.component.scss']
})
export class TaskOverviewComponent extends TaskDatabaseTableComponent {
  @ViewChild(MatPaginator) overviewPaginator?: MatPaginator;
  @ViewChild(MatSort) overviewSort?: MatSort;
  @ViewChild('overviewEditComponent', {static: false}) overviewEditComponent?: DatabaseEditEntryComponent;
  @Input() entries?: NgTaskEntity[];
  renderData: NgTaskEntity[] = [];
  showPaginator = false;
  apiRoute = 'task';
  showLocation = false;
  @Input() task?: NgTaskEntity;
  @Output() onSave = new EventEmitter<NgTaskEntity>();
  @Output() onDelete = new EventEmitter();
  showArModel = false;


  ngAfterViewInit() {
    this.getCustomData();
    this.initOverview();

  }

  ngOnChanges(changes: SimpleChanges) {

    super.ngOnChanges(changes);
    this.getCustomData();
  }

  initOverview() {
    this.showPaginator = (this.task !== undefined || this.entry !== undefined);
    this.paginator = !this.paginator ? this.overviewPaginator : this.paginator;
    this.sort = !this.overviewSort ? this.overviewSort : this.sort;
    this.editComponent = !this.editComponent ? this.overviewEditComponent : this.editComponent;
  }

  getCustomData() {
    this.initOverview();

    if (this.task?.id) {
      this.entries = this.adminService.apiData['task'].filter((task: NgTaskEntity) => task.nextTask === this.task?.id);
      this.editComponent = this.adminService.editTaskComponent;
    } else if (this.entry && this.fieldKey && (this.entry as any)[this.fieldKey]) {
      this.entries = this.adminService.apiData['task'].filter((task: NgTaskEntity) => this.fieldKey ? task.nextTask === (this.entry as any)[this.fieldKey] : false);
      this.editComponent = this.adminService.editTaskComponent;
    } else {
      this.entries = this.adminService.apiData['task'].filter((task: NgTaskEntity) => !task.nextTask);
    }
    this.initData(this.entries);
    this.ready = true;
    return true;
  }

  addNew() {
    if (this.editComponent) {
      this.editComponent.addNew();
      if (this.task && this.editComponent.entry) {
        this.editComponent.entry.parentId = this.task.id;
      }
    }
  }

  newEntry() {
    super.newEntry();
    if (this.task && this.editEntry) {
      this.editEntry.parentId = this.task.id;
    }
  }

  setEditEntry(task: NgTaskEntity, subTask = false) {
    if (this.editable) {
      this.editEntry = task;
      if (this.task && this.editEntry && !subTask) {
        this.editEntry.parentId = this.task.id;
      }
      if (this.editComponent) {
        this.editComponent.editEntry(task);
      }
      console.log('setEditEntry', this.editEntry, this.editComponent);
    }
  }

  updateTask() {
    if (this.task && !this.task.dataIsLoading) {
      this.task.dataIsLoading = true;
      setTimeout(() => {
        if (this.task) {
          this.task.dataIsLoading = false;
        }
      }, 0);
    }
  }

  deleteEntry(entry: NgTaskEntity) {
    if (entry) {
      this.adminService.deleteEntry(entry, () => {
        this.getCustomData();
        this.updateTask();
        this.onDelete.emit();
      });
    }
  }
}
