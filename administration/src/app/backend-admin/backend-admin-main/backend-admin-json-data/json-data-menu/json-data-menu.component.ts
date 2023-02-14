import { Component, Input } from '@angular/core';
import { BackendAdminService } from '../../../backend-admin.service';
import { JsonDataService } from '../json-data.service';

@Component({
  selector: 'app-json-data-menu',
  templateUrl: './json-data-menu.component.html',
  styleUrls: ['./json-data-menu.component.scss']
})
export class JsonDataMenuComponent {
  constructor(public adminService: BackendAdminService) {
  }

}
