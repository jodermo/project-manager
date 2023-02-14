import { Component, EventEmitter, Output } from '@angular/core';
import { DatabaseTableComponent } from '../../../../../backend-admin-components/database/database-table/database-table.component';
import { BackendAdminService } from '../../../../../backend-admin.service';
import { NgFileEntity } from '../../../../../../../../../angular-classes/angular-entities/ng.file.entity';

@Component({
  selector: 'app-files-database-table',
  templateUrl: './files-database-table.component.html',
  styleUrls: ['./files-database-table.component.scss']
})
export class FilesDatabaseTableComponent extends DatabaseTableComponent {

  apiRoute = 'file';

  @Output() onSave = new EventEmitter<NgFileEntity>();
  @Output() onDelete = new EventEmitter();

  constructor(public adminService: BackendAdminService) {
    super(adminService);
  }

}
