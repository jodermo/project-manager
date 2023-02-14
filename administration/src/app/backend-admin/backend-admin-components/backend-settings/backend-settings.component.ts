import { Component, OnInit } from '@angular/core';
import { BackendAdminService } from '../../backend-admin.service';

@Component({
  selector: 'app-backend-settings',
  templateUrl: './backend-settings.component.html',
  styleUrls: ['./backend-settings.component.scss']
})
export class BackendSettingsComponent implements OnInit {

  constructor(public adminService: BackendAdminService) {
  }

  ngOnInit(): void {
  }

}
