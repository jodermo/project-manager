import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DatabaseTableComponent } from '../../../../../backend-admin-components/database/database-table/database-table.component';
import { BackendAdminService } from '../../../../../backend-admin.service';
import {
  NgAttributeEntity
} from "../../../../../../../../../angular-classes/angular-entities/ng.attribute.entity";

@Component({
  selector: 'app-attribute-database-table',
  templateUrl: './attribute-database-table.component.html',
  styleUrls: ['./attribute-database-table.component.scss']
})
export class AttributeDatabaseTableComponent extends DatabaseTableComponent {
  @Input() entries?: NgAttributeEntity[];
  renderData: NgAttributeEntity[] = [];
  @Output() onSave = new EventEmitter<NgAttributeEntity>();
  @Output() onDelete = new EventEmitter();
  apiRoute = 'attribute';

  constructor(public adminService: BackendAdminService) {
    super(adminService);
  }


  loadAllEntries() {
    this.initData(this.adminService.apiData[this.apiRoute]);

  }
}
