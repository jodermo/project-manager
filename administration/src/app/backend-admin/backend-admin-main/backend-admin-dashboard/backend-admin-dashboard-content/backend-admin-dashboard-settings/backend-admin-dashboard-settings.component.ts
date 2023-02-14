import { Component, OnInit } from '@angular/core';
import { BackendAdminService } from '../../../../backend-admin.service';

@Component({
  selector: 'app-backend-admin-dashboard-settings',
  templateUrl: './backend-admin-dashboard-settings.component.html',
  styleUrls: ['./backend-admin-dashboard-settings.component.scss']
})
export class BackendAdminDashboardSettingsComponent implements OnInit {

  constructor(public adminService: BackendAdminService) { }

  ngOnInit(): void {
  }

}
