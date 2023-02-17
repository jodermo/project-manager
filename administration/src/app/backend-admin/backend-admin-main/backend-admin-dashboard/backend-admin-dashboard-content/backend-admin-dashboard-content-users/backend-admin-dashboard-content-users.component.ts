import { Component, OnInit } from '@angular/core';
import { BackendAdminService } from '../../../../backend-admin.service';

@Component({
  selector: 'app-backend-admin-dashboard-content-users',
  templateUrl: './backend-admin-dashboard-content-users.component.html',
  styleUrls: ['./backend-admin-dashboard-content-users.component.scss']
})
export class BackendAdminDashboardContentUsersComponent implements OnInit {
  tabIndex = 0;
  loaded = false;

  constructor(public adminService: BackendAdminService) {
  }

  ngOnInit(): void {
  }
}
