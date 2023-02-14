import { Component } from '@angular/core';
import { DatabaseTableFieldComponent } from '../database-table-field/database-table-field.component';
import { BackendAdminService } from '../../../../backend-admin.service';

@Component({
  selector: 'app-database-table-label',
  templateUrl: './database-table-label.component.html',
  styleUrls: ['./database-table-label.component.scss']
})
export class DatabaseTableLabelComponent extends DatabaseTableFieldComponent {
  apiRoute = 'memo';

  constructor(public adminService: BackendAdminService) {
    super(adminService);
  }
}
