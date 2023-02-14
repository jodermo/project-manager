import { Component, Input, SimpleChanges, ViewChild } from '@angular/core';
import { BackendAdminService } from '../../../../backend-admin.service';
import { DatabaseTableComponent } from '../../../../backend-admin-components/database/database-table/database-table.component';
import { PoiOverviewComponent } from './poi-overview/poi-overview.component';
import { PoiMapComponent } from '../../../../backend-admin-components/poi-map/poi-map.component';
import { PoiDatabaseTableComponent } from './poi-database-table/poi-database-table.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EditPoiComponent } from './edit-poi/edit-poi.component';
import { NgPoiEntity } from '../../../../../../../../angular-classes/angular-entities/ng.poi.entity';

@Component({
  selector: 'app-backend-admin-dashboard-pois',
  templateUrl: './backend-admin-dashboard-pois.component.html',
  styleUrls: ['./backend-admin-dashboard-pois.component.scss']
})
export class BackendAdminDashboardPoisComponent extends PoiDatabaseTableComponent {
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;
  @ViewChild('mapComponent', {static: false}) mapComponent?: PoiMapComponent;
  @ViewChild('editComponent', {static: false}) editComponent?: EditPoiComponent;
  @ViewChild('overviewComponent', {static: false}) overviewComponent?: PoiOverviewComponent;
  @ViewChild('databaseTable', {static: false}) databaseTable?: DatabaseTableComponent;
  @Input() entries?: NgPoiEntity[];
  renderData: NgPoiEntity[] = [];
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
    this.initData(this.adminService.apiData['poi']);
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

  setEditEntry(editEntry: NgPoiEntity) {
    this.editEntry = editEntry;
    if (this.editComponent) {
      this.editComponent.editEntry(this.editEntry);
    } else if (this.databaseTable) {
      this.tabIndex = 2;
      this.databaseTable.editEntry = this.editEntry;
    }
  }

  onSaveEntry(entry: NgPoiEntity) {

    this.initData(this.adminService.apiData['poi']);
  }

  onDeleteEntry() {
    console.log('onDeleteEntry');
    this.initData(this.adminService.apiData['poi']);
  }
}
