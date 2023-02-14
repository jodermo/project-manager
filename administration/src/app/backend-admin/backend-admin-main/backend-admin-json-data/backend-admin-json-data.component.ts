import { Component } from '@angular/core';
import { BackendAdminService } from '../../backend-admin.service';

@Component({
  selector: 'app-backend-admin-json-data',
  templateUrl: './backend-admin-json-data.component.html',
  styleUrls: ['./backend-admin-json-data.component.scss']
})
export class BackendAdminJsonDataComponent {
  constructor(public adminService: BackendAdminService) {
  }
}
