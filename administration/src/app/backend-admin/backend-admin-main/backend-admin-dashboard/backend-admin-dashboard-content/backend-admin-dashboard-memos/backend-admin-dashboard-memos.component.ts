import { Component, Input, SimpleChanges, ViewChild } from '@angular/core';
import { BackendAdminService } from '../../../../backend-admin.service';
import { DatabaseTableComponent } from '../../../../backend-admin-components/database/database-table/database-table.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PoiOverviewComponent } from '../backend-admin-dashboard-pois/poi-overview/poi-overview.component';
import { MemoDatabaseTableComponent } from './memo-database-table/memo-database-table.component';
import { EditMemoComponent } from './edit-memo/edit-memo.component';
import { NgMemoEntity } from '../../../../../../../../angular-classes/angular-entities/ng.memo.entity';

@Component({
  selector: 'app-backend-admin-dashboard-memos',
  templateUrl: './backend-admin-dashboard-memos.component.html',
  styleUrls: ['./backend-admin-dashboard-memos.component.scss']
})
export class BackendAdminDashboardMemosComponent extends MemoDatabaseTableComponent {
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;
  @ViewChild('editComponent', {static: false}) editComponent?: EditMemoComponent;
  @ViewChild('overviewComponent', {static: false}) overviewComponent?: PoiOverviewComponent;
  @ViewChild('databaseTable', {static: false}) databaseTable?: DatabaseTableComponent;

  @Input() entries?: NgMemoEntity[];
  renderData: NgMemoEntity[] = [];

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
    this.initData(this.adminService.apiData['memo']);
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

  }

  onSaveEntry(entry: NgMemoEntity) {
    this.initData(this.adminService.apiData['memo']);
  }

  onDeleteEntry() {
    this.initData(this.adminService.apiData['memo']);
  }
}
