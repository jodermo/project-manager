import {Component, Input, ViewChild} from '@angular/core';
import {
  DatabaseDashboardComponent
} from '../../../../backend-admin-components/database/database-dashboard/database-dashboard.component';
import {
  DatabaseOverviewComponent
} from '../../../../backend-admin-components/database/database-overview/database-overview.component';
import {
  DatabaseTableComponent
} from '../../../../backend-admin-components/database/database-table/database-table.component';
import {
  DatabaseEditEntryComponent
} from '../../../../backend-admin-components/database/database-edit-entry/database-edit-entry.component';
import {
  NgAttributeEntity
} from "../../../../../../../../angular-classes/angular-entities/ng.attribute.entity";


@Component({
  selector: 'app-backend-admin-dashboard-attributes',
  templateUrl: './backend-admin-dashboard-attributes.component.html',
  styleUrls: ['./backend-admin-dashboard-attributes.component.scss']
})
export class BackendAdminDashboardAttributesComponent extends DatabaseDashboardComponent {

  @ViewChild('overviewComponent', {static: false}) overviewComponent?: DatabaseOverviewComponent;
  @ViewChild('databaseTable', {static: false}) databaseTable?: DatabaseTableComponent;
  @ViewChild('editComponent', {static: false}) editComponent?: DatabaseEditEntryComponent;
  @Input() entries?: NgAttributeEntity[];
  renderData: NgAttributeEntity[] = [];
  apiRoute = 'attribute';

  afterInit() {
    setTimeout(() => {
      if (!this.entries) {
        this.entries = [];

        this.initData(this.entries);
        this.ready = true;
      }
      console.log('afterInit', this.apiRoute, this.entries);
    }, 0);

  }

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

  onSaveEntry(entry: NgAttributeEntity) {
    this.initData(this.adminService.apiData['attribute']);
  }

  onDeleteEntry() {
    this.initData(this.adminService.apiData['attribute']);
  }
}
