import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BackendAdminService } from '../../../../../backend-admin.service';
import { DatabaseTableComponent } from '../../../../../backend-admin-components/database/database-table/database-table.component';
import { EditLocationComponent } from '../edit-location/edit-location.component';
import { NgLocationEntity } from '../../../../../../../../../angular-classes/angular-entities/ng.location.entity';

@Component({
  selector: 'app-locations-database-table',
  templateUrl: './locations-database-table.component.html',
  styleUrls: ['./locations-database-table.component.scss']
})
export class LocationsDatabaseTableComponent extends DatabaseTableComponent {
  // @ts-ignore
  @Input() editComponent?: EditLocationComponent;
  @Input() edit = false;
  @Input() entries?: NgLocationEntity[];
  renderData: NgLocationEntity[] = [];
  editable = true;
  apiRoute = 'location';

  @Output() onSave = new EventEmitter<NgLocationEntity>();
  @Output() onDelete = new EventEmitter();

  constructor(public adminService: BackendAdminService) {
    super(adminService);
    this.entries = adminService.apiData['location'];
  }

}
