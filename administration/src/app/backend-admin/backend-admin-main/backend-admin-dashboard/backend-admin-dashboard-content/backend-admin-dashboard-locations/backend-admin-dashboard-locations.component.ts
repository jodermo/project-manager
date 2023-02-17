import { Component, Input, SimpleChanges, ViewChild } from '@angular/core';
import { BackendAdminService } from '../../../../backend-admin.service';
import { DatabaseTableComponent } from '../../../../backend-admin-components/database/database-table/database-table.component';
import { LocationsOverviewComponent } from './locations-overview/locations-overview.component';
import { LocationsMapComponent } from '../../../../backend-admin-components/locations-map/locations-map.component';
import { LocationsDatabaseTableComponent } from './locations-database-table/locations-database-table.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EditLocationComponent } from './edit-location/edit-location.component';
import { NgLocationEntity } from '../../../../../../../../angular-classes/angular-entities/ng.location.entity';

@Component({
  selector: 'app-backend-admin-dashboard-locations',
  templateUrl: './backend-admin-dashboard-locations.component.html',
  styleUrls: ['./backend-admin-dashboard-locations.component.scss']
})
export class BackendAdminDashboardLocationsComponent extends LocationsDatabaseTableComponent {
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;
  @ViewChild('mapComponent', {static: false}) mapComponent?: LocationsMapComponent;
  @ViewChild('editComponent', {static: false}) editComponent?: EditLocationComponent;
  @ViewChild('overviewComponent', {static: false}) overviewComponent?: LocationsOverviewComponent;
  @ViewChild('databaseTable', {static: false}) databaseTable?: DatabaseTableComponent;
  @Input() entries?: NgLocationEntity[];
  renderData: NgLocationEntity[] = [];
  tabIndex = 0;
  loaded = false;


  constructor(public adminService: BackendAdminService) {
    super(adminService);
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
    setTimeout(() => {
      this.loaded = true;
    }, 0);
  }

  ngOnChanges(changes: SimpleChanges) {
    super.ngOnChanges(changes);
    this.initData(this.adminService.apiData['location']);
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

  tabChange() {
    setTimeout(() => {
      if (this.mapComponent) {
        this.mapComponent.updateMap();
      }
    }, 250);
  }

  setEditEntry(editEntry: NgLocationEntity) {
    this.editEntry = editEntry;
    if (this.editComponent) {
      this.editComponent.editEntry(this.editEntry);
    } else if (this.databaseTable) {
      this.tabIndex = 2;
      this.databaseTable.editEntry = this.editEntry;
    }
  }

  onSaveEntry(entry: NgLocationEntity) {

    this.initData(this.adminService.apiData['location']);
  }

  onDeleteEntry() {
    console.log('onDeleteEntry');
    this.initData(this.adminService.apiData['location']);
  }
}
