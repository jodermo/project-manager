import { Component, OnInit } from '@angular/core';
import {BackendAdminService} from "../../../../backend-admin.service";

@Component({
  selector: 'app-backend-admin-dashboard-projects',
  templateUrl: './backend-admin-dashboard-projects.component.html',
  styleUrls: ['./backend-admin-dashboard-projects.component.scss']
})
export class BackendAdminDashboardProjectsComponent implements OnInit {

  constructor(public adminService: BackendAdminService) {
  }

  ngOnInit(): void {
  }

}
