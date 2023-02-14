import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { DatabaseTableComponent } from '../../../../../backend-admin-components/database/database-table/database-table.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DatabaseEditEntryComponent } from '../../../../../backend-admin-components/database/database-edit-entry/database-edit-entry.component';
import { BackendAdminService } from '../../../../../backend-admin.service';
import { NgApiEntity } from '../../../../../../../../../angular-classes/ng.api.entity';
import { NgFileEntity } from '../../../../../../../../../angular-classes/angular-entities/ng.file.entity';
import { NgPoiEntity } from '../../../../../../../../../angular-classes/angular-entities/ng.poi.entity';

@Component({
  selector: 'app-files-overview',
  templateUrl: './files-overview.component.html',
  styleUrls: ['./files-overview.component.scss']
})
export class FilesOverviewComponent extends DatabaseTableComponent {
  @ViewChild(MatPaginator) overviewPaginator?: MatPaginator;
  @ViewChild(MatSort) overviewSort?: MatSort;
  @ViewChild('overviewEditComponent', {static: false}) overviewEditComponent?: DatabaseEditEntryComponent;
  showPaginator = false;
  apiRoute = 'file';
  @Input() entries?: NgFileEntity[];
  renderData: NgFileEntity[] = [];

  @Output() onSave = new EventEmitter<NgFileEntity>();
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

  deleteEntry(entry: NgFileEntity) {
    if (this.editable) {
      this.adminService.deleteFile(entry, ()=>{
        this.ngAfterViewInit();
        this.onDelete.emit();
      });
    }
  }
}
