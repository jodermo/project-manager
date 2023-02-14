import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DatabaseEditEntryComponent } from '../../../../../backend-admin-components/database/database-edit-entry/database-edit-entry.component';
import { BackendAdminService } from '../../../../../backend-admin.service';
import { DatabaseTableComponent } from '../../../../../backend-admin-components/database/database-table/database-table.component';
import { NgCompanyEntity } from '../../../../../../../../../angular-classes/angular-entities/ng.company.entity';

@Component({
  selector: 'app-companies-overview',
  templateUrl: './companies-overview.component.html',
  styleUrls: ['./companies-overview.component.scss']
})
export class CompaniesOverviewComponent extends DatabaseTableComponent {
  @ViewChild(MatPaginator) overviewPaginator?: MatPaginator;
  @ViewChild(MatSort) overviewSort?: MatSort;
  @ViewChild('overviewEditComponent', {static: false}) overviewEditComponent?: DatabaseEditEntryComponent;
  @Input() entries?: NgCompanyEntity[];
  renderData: NgCompanyEntity[] = [];
  showPaginator = false;
  apiRoute = 'company';
  showPoi = false;
  @Output() onSave = new EventEmitter<NgCompanyEntity>();
  @Output() onDelete = new EventEmitter();

  constructor(public adminService: BackendAdminService) {
    super(adminService);
  }

  ngAfterViewInit() {
    this.getCustomData();
    this.initOverview();
  }

  initOverview() {
    this.showPaginator = (this.entry !== undefined);
    this.paginator = !this.paginator ? this.overviewPaginator : this.paginator;
    this.sort = !this.overviewSort ? this.overviewSort : this.sort;
    this.editComponent = !this.editComponent ? this.overviewEditComponent : this.editComponent;
  }

  getCustomData() {
    this.initOverview();
    this.initData(this.entries);
    this.ready = true;
    return true;
  }

  addNew() {
    if (this.overviewEditComponent) {
      this.overviewEditComponent.addNew()
    } else if (this.editComponent) {
      this.editComponent.addNew();
    }
  }

  setEditEntry(entry: any) {
    if (this.editable) {
      this.editEntry = entry;
      if (this.editComponent) {
        this.editComponent.editEntry(entry);
      }
    }
  }

  deleteEntry(entry: NgCompanyEntity) {
    if (entry) {
      this.adminService.deleteEntry(entry, () => {
        this.onDelete.emit();
      });
    }
  }
}
