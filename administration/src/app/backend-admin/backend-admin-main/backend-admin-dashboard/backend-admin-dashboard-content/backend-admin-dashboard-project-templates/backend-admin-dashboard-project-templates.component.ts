import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {BackendAdminService} from "../../../../backend-admin.service";
import {
  DatabaseDashboardComponent
} from "../../../../backend-admin-components/database/database-dashboard/database-dashboard.component";
import {
  DatabaseOverviewComponent
} from "../../../../backend-admin-components/database/database-overview/database-overview.component";
import {
  DatabaseTableComponent
} from "../../../../backend-admin-components/database/database-table/database-table.component";
import {
  DatabaseEditEntryComponent
} from "../../../../backend-admin-components/database/database-edit-entry/database-edit-entry.component";
import {
  NgProjectTemplateEntity
} from "../../../../../../../../angular-classes/angular-entities/ng.project-template.entity";

@Component({
  selector: 'app-backend-admin-dashboard-project-templates',
  templateUrl: './backend-admin-dashboard-project-templates.component.html',
  styleUrls: ['./backend-admin-dashboard-project-templates.component.scss']
})
export class BackendAdminDashboardProjectTemplatesComponent extends DatabaseDashboardComponent {

  @ViewChild('overviewComponent', {static: false}) overviewComponent?: DatabaseOverviewComponent;
  @ViewChild('databaseTable', {static: false}) databaseTable?: DatabaseTableComponent;
  @ViewChild('editComponent', {static: false}) editComponent?: DatabaseEditEntryComponent;
  @Input() entries?: NgProjectTemplateEntity[];
  renderData: NgProjectTemplateEntity[] = [];
  apiRoute = 'project-template';

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

  onSaveEntry(entry: NgProjectTemplateEntity) {
    this.initData(this.adminService.apiData['project-template']);
    this.getCustomData();
  }

  onDeleteEntry() {
    this.initData(this.adminService.apiData['project-template']);
    this.getCustomData();
  }

}
