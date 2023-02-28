import { Component, OnInit } from '@angular/core';
import {BackendAdminService} from "../../../../backend-admin.service";

@Component({
  selector: 'app-backend-admin-dashboard-content-projects',
  templateUrl: './backend-admin-dashboard-content-projects.component.html',
  styleUrls: ['./backend-admin-dashboard-content-projects.component.scss']
})
export class BackendAdminDashboardContentProjectsComponent implements OnInit {
  tabIndex = 0;
  loaded = false;

  constructor(public adminService: BackendAdminService) {
  }

  ngOnInit(): void {
  }

}
