import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { DatabaseDashboardComponent } from '../../../../backend-admin-components/database/database-dashboard/database-dashboard.component';
import { NgTaskEntity } from '../../../../../../../../angular-classes/angular-entities/ng.task.entity';
import { NgLocationEntity } from '../../../../../../../../angular-classes/angular-entities/ng.location.entity';
import { DatabaseOverviewComponent } from '../../../../backend-admin-components/database/database-overview/database-overview.component';
import { TaskDatabaseTableComponent } from './task-database-table/task-database-table.component';

@Component({
  selector: 'app-backend-admin-dashboard-tasks',
  templateUrl: './backend-admin-dashboard-tasks.component.html',
  styleUrls: ['./backend-admin-dashboard-tasks.component.scss']
})
export class BackendAdminDashboardTasksComponent extends DatabaseDashboardComponent implements OnChanges {

  @ViewChild('overviewComponent', {static: false}) overviewComponent?: DatabaseOverviewComponent;
  @ViewChild('databaseTable', {static: false}) databaseTable?: TaskDatabaseTableComponent;
  @ViewChild('editComponent', {static: false}) editComponent?: EditTaskComponent;
  @Input() tasks: NgTaskEntity[] = [];
  @Input() task?: NgTaskEntity;
  @Input() location?: NgLocationEntity;
  @Input() entries?: NgTaskEntity[];
  renderData: NgTaskEntity[] = [];


  ngOnChanges(changes: SimpleChanges) {
    super.ngOnChanges(changes);
    this.getCustomData();
    this.applyFilter();
  }

  applyFilter(event?: Event) {
    super.applyFilter(event);
    if (this.databaseTable) {
      this.databaseTable.applyFilter(event);
    }
    if (this.overviewComponent) {
      this.overviewComponent.applyFilter(event);
    }
    return event;
  }

  newEntry() {
    if (this.editComponent) {
      this.editComponent.addNew();
    } else if (this.databaseTable) {
      this.tabIndex = 2;
      this.databaseTable.newEntry();
    }
  }

  getCustomData() {
    if (this.entry && this.fieldKey) {
      this.tasks = [];
      const ids = (this.entry as any)[this.fieldKey];
      if (ids?.length) {
        for (const id of ids) {
          const task = this.adminService.apiData['task'].find((task: NgTaskEntity) => task.id === id);
          if (task) {
            this.tasks.push(task);
          }
        }
      }
    } else if (this.task) {
      this.tasks = this.adminService.subTasks(this.task);
    } else {
      this.tasks = this.adminService.mainTasks();
    }

    this.initData(this.tasks);

    this.applyFilter();
    setTimeout(() => {
      this.ready = true;
      this.loaded = true;
    }, 0);
    return true;
  }

  onSaveEntry(entry: NgTaskEntity) {
    this.getCustomData();
    if (this.editComponent) {
      this.editComponent.updateEntry();
    }
  }

  onDeleteEntry() {
    this.getCustomData();
    if (this.editComponent) {
      this.editComponent.updateEntry();
    }
  }
}
