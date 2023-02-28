import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BackendAdminService } from '../../../../../backend-admin.service';
import { DatabaseTableComponent } from '../../../../../backend-admin-components/database/database-table/database-table.component';
import { NgProjectTemplateEntity } from '../../../../../../../../../angular-classes/angular-entities/ng.project-template.entity';
import { NgLocationEntity } from '../../../../../../../../../angular-classes/angular-entities/ng.location.entity';

@Component({
  selector: 'app-project-template-database-table',
  templateUrl: './project-template-database-table.component.html',
  styleUrls: ['./project-template-database-table.component.scss']
})
export class ProjectTemplateDatabaseTableComponent extends DatabaseTableComponent {
  @Input() entries?: NgProjectTemplateEntity[];
  renderData: NgProjectTemplateEntity[] = [];
  @Input() projectTemplate?: NgProjectTemplateEntity;
  @Input() location?: NgLocationEntity;

  apiRoute = 'project-template';

  @Output() onSave = new EventEmitter<NgProjectTemplateEntity>();
  @Output() onDelete = new EventEmitter();

  constructor(public adminService: BackendAdminService) {
    super(adminService);
  }


  loadAllEntries() {
    this.initData(this.adminService.apiData['project-template']);

  }
}
