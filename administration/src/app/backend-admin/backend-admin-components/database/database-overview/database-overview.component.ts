import { Component, Input, ViewChild } from '@angular/core';
import { BackendAdminService } from '../../../backend-admin.service';
import { DatabaseTableComponent } from '../database-table/database-table.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DatabaseEditEntryComponent } from '../database-edit-entry/database-edit-entry.component';

@Component({
  selector: 'app-database-overview',
  templateUrl: './database-overview.component.html',
  styleUrls: ['./database-overview.component.scss']
})
export class DatabaseOverviewComponent extends DatabaseTableComponent {
  @ViewChild(MatPaginator) overviewPaginator?: MatPaginator;
  @ViewChild(MatSort) overviewSort?: MatSort;
  @ViewChild('editComponent', {static: false}) overviewEditComponent?: DatabaseEditEntryComponent;

  constructor(public adminService: BackendAdminService) {
    super(adminService);
  }



  ngAfterViewInit() {
    this.getCustomData();
    this.initOverview();
  }

  initOverview() {
    this.paginator = !this.paginator ? this.overviewPaginator : this.paginator;
    this.sort = !this.overviewSort ? this.overviewSort : this.sort;
    this.editComponent = !this.editComponent ? this.overviewEditComponent : this.editComponent;
  }

  getCustomData() {
    this.initOverview();
  }

  addNew() {
    if (this.editComponent) {
      this.editComponent.addNew()
    }
  }

  setEditEntry(poi: any) {
    if (this.editable) {
      this.editEntry = poi;
      if (this.editComponent) {
        this.editComponent.editEntry(poi);
      }
    }
  }

}
