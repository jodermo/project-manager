import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DatabaseTableComponent } from '../../../../../backend-admin-components/database/database-table/database-table.component';
import { BackendAdminService } from '../../../../../backend-admin.service';
import { EditMemoComponent } from '../edit-memo/edit-memo.component';
import { NgMemoEntity } from '../../../../../../../../../angular-classes/angular-entities/ng.memo.entity';
import { NgTaskEntity } from '../../../../../../../../../angular-classes/angular-entities/ng.task.entity';

@Component({
  selector: 'app-memo-database-table',
  templateUrl: './memo-database-table.component.html',
  styleUrls: ['./memo-database-table.component.scss']
})
export class MemoDatabaseTableComponent extends DatabaseTableComponent {
  // @ts-ignore
  @Input() editComponent?: EditMemoComponent;
  @Input() edit = false;
  @Input() entries?: NgMemoEntity[];
  renderData: NgMemoEntity[] = [];
  apiRoute = 'memo';
  @Output() onSave = new EventEmitter<NgMemoEntity>();
  @Output() onDelete = new EventEmitter();

  constructor(public adminService: BackendAdminService) {
    super(adminService);

  }

}
