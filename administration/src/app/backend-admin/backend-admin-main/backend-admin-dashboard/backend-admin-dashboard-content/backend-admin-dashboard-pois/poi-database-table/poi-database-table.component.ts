import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BackendAdminService } from '../../../../../backend-admin.service';
import { DatabaseTableComponent } from '../../../../../backend-admin-components/database/database-table/database-table.component';
import { EditPoiComponent } from '../edit-poi/edit-poi.component';
import { NgPoiEntity } from '../../../../../../../../../angular-classes/angular-entities/ng.poi.entity';

@Component({
  selector: 'app-poi-database-table',
  templateUrl: './poi-database-table.component.html',
  styleUrls: ['./poi-database-table.component.scss']
})
export class PoiDatabaseTableComponent extends DatabaseTableComponent {
  // @ts-ignore
  @Input() editComponent?: EditPoiComponent;
  @Input() edit = false;
  @Input() entries?: NgPoiEntity[];
  renderData: NgPoiEntity[] = [];
  editable = true;
  apiRoute = 'poi';

  @Output() onSave = new EventEmitter<NgPoiEntity>();
  @Output() onDelete = new EventEmitter();

  constructor(public adminService: BackendAdminService) {
    super(adminService);
    this.entries = adminService.apiData['poi'];
  }

}
