import { Component, Input, ViewChild } from '@angular/core';
import { DatabaseDashboardComponent } from '../../../../backend-admin-components/database/database-dashboard/database-dashboard.component';
import { DatabaseOverviewComponent } from '../../../../backend-admin-components/database/database-overview/database-overview.component';
import { DatabaseTableComponent } from '../../../../backend-admin-components/database/database-table/database-table.component';
import { DatabaseEditEntryComponent } from '../../../../backend-admin-components/database/database-edit-entry/database-edit-entry.component';
import { NgFileEntity } from '../../../../../../../../angular-classes/angular-entities/ng.file.entity';

@Component({
  selector: 'app-backend-admin-dashboard-files',
  templateUrl: './backend-admin-dashboard-files.component.html',
  styleUrls: ['./backend-admin-dashboard-files.component.scss']
})
export class BackendAdminDashboardFilesComponent extends DatabaseDashboardComponent {

  @ViewChild('overviewComponent', {static: false}) overviewComponent?: DatabaseOverviewComponent;
  @ViewChild('databaseTable', {static: false}) databaseTable?: DatabaseTableComponent;
  @ViewChild('editComponent', {static: false}) editComponent?: DatabaseEditEntryComponent;
  @Input() entries?: NgFileEntity[];
  renderData: NgFileEntity[] = [];
  apiRoute = 'file';

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

  onSaveEntry(entry: NgFileEntity) {
    this.initData(this.adminService.apiData['file']);
    this.getCustomData();
  }

  onDeleteEntry() {
    this.initData(this.adminService.apiData['file']);
    this.getCustomData();
  }
}
