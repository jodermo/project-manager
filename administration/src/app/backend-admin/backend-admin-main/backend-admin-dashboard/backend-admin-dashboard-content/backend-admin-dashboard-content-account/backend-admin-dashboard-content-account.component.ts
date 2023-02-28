import { Component, OnInit } from '@angular/core';
import { BackendAdminService } from '../../../../backend-admin.service';

@Component({
  selector: 'app-backend-admin-dashboard-content-account',
  templateUrl: './backend-admin-dashboard-content-account.component.html',
  styleUrls: ['./backend-admin-dashboard-content-account.component.scss']
})
export class BackendAdminDashboardContentAccountComponent implements OnInit {

  tabIndex = 0;
  loaded = false;

  constructor(public adminService: BackendAdminService) {
  }

  ngOnInit(): void {
  }

}
