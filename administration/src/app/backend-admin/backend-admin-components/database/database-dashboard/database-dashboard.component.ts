import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DatabaseTableComponent } from '../database-table/database-table.component';
import { BackendAdminService } from '../../../backend-admin.service';
import { DatabaseOverviewComponent } from '../database-overview/database-overview.component';

@Component({
  selector: 'app-database-dashboard',
  templateUrl: './database-dashboard.component.html',
  styleUrls: ['./database-dashboard.component.scss']
})
export class DatabaseDashboardComponent extends DatabaseTableComponent {
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;
  @ViewChild('overviewComponent', {static: false}) overviewComponent?: DatabaseOverviewComponent;
  @ViewChild('databaseTable', {static: false}) databaseTable?: DatabaseTableComponent;
  tabIndex = 0;
  loaded = false;


  constructor(public adminService: BackendAdminService) {
    super(adminService);
  }

  tabChange() {

  }

  getCustomData(): any {
    super.getCustomData();
    this.loaded = true;
  }
}
