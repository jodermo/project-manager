import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { DatabaseTableComponent } from '../../../../../backend-admin-components/database/database-table/database-table.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DatabaseEditEntryComponent } from '../../../../../backend-admin-components/database/database-edit-entry/database-edit-entry.component';
import { BackendAdminService } from '../../../../../backend-admin.service';
import {
  NgAttributeEntity
} from "../../../../../../../../../angular-classes/angular-entities/ng.attribute.entity";

@Component({
  selector: 'app-attribute-overview',
  templateUrl: './attribute-overview.component.html',
  styleUrls: ['./attribute-overview.component.scss']
})
export class AttributeOverviewComponent extends DatabaseTableComponent {
  @ViewChild(MatPaginator) overviewPaginator?: MatPaginator;
  @ViewChild(MatSort) overviewSort?: MatSort;
  @ViewChild('overviewEditComponent', {static: false}) overviewEditComponent?: DatabaseEditEntryComponent;
  @Input() entries?: NgAttributeEntity[];
  renderData: NgAttributeEntity[] = [];
  showPaginator = false;
  apiRoute = 'attribute';
  showLocation = false;
  @Output() onSave = new EventEmitter<NgAttributeEntity>();
  @Output() onDelete = new EventEmitter();

  constructor(public adminService: BackendAdminService) {
    super(adminService);
  }

  afterInit() {
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
    console.log('getCustomData', this.entries);
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

  deleteEntry(entry: NgAttributeEntity) {
    if (entry) {
      this.adminService.deleteEntry(entry, () => {
        this.onDelete.emit();
      });
    }
  }
}
