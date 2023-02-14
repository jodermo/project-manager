import { Component, Input, ViewChild } from '@angular/core';
import { DatabaseDashboardComponent } from '../../../../backend-admin-components/database/database-dashboard/database-dashboard.component';
import { DatabaseOverviewComponent } from '../../../../backend-admin-components/database/database-overview/database-overview.component';
import { DatabaseTableComponent } from '../../../../backend-admin-components/database/database-table/database-table.component';
import { DatabaseEditEntryComponent } from '../../../../backend-admin-components/database/database-edit-entry/database-edit-entry.component';
import { NgCompanyEntity } from '../../../../../../../../angular-classes/angular-entities/ng.company.entity';

@Component({
  selector: 'app-backend-admin-dashboard-companies',
  templateUrl: './backend-admin-dashboard-companies.component.html',
  styleUrls: ['./backend-admin-dashboard-companies.component.scss']
})
export class BackendAdminDashboardCompaniesComponent extends DatabaseDashboardComponent {

  @ViewChild('overviewComponent', {static: false}) overviewComponent?: DatabaseOverviewComponent;
  @ViewChild('databaseTable', {static: false}) databaseTable?: DatabaseTableComponent;
  @ViewChild('editComponent', {static: false}) editComponent?: DatabaseEditEntryComponent;
  @Input() entries?: NgCompanyEntity[];
  renderData: NgCompanyEntity[] = [];
  apiRoute = 'company';

  applyFilter(event?: Event) {
    super.applyFilter(event);
    if (this.databaseTable) {
      this.databaseTable.applyFilter(event);
    }
    if (this.overviewComponent) {
      this.overviewComponent.applyFilter(event);
    }
  }

  newEntry() {
    if (this.editComponent) {
      this.editComponent.addNew();
    } else if (this.databaseTable) {
      this.tabIndex = 2;
      this.databaseTable.newEntry();
    }
  }
  onSaveEntry(entry: NgCompanyEntity) {
    this.initData(this.adminService.apiData['company']);
  }

  onDeleteEntry() {
    this.initData(this.adminService.apiData['company']);
  }
}
