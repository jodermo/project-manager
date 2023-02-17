import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DatabaseTableComponent } from '../../../../../backend-admin-components/database/database-table/database-table.component';
import { BackendAdminService } from '../../../../../backend-admin.service';
import { NgCompanyEntity } from '../../../../../../../../../angular-classes/angular-entities/ng.company.entity';

@Component({
  selector: 'app-companies-database-table',
  templateUrl: './companies-database-table.component.html',
  styleUrls: ['./companies-database-table.component.scss']
})
export class CompaniesDatabaseTableComponent extends DatabaseTableComponent {
  @Input() entries?: NgCompanyEntity[];
  renderData: NgCompanyEntity[] = [];
  @Output() onSave = new EventEmitter<NgCompanyEntity>();
  @Output() onDelete = new EventEmitter();
  apiRoute = 'company';

  constructor(public adminService: BackendAdminService) {
    super(adminService);
  }

}
