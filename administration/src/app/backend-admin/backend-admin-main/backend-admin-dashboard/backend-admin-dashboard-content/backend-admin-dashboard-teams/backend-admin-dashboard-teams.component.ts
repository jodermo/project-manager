import { Component, OnInit } from '@angular/core';
import {BackendAdminService} from "../../../../backend-admin.service";

@Component({
  selector: 'app-backend-admin-dashboard-teams',
  templateUrl: './backend-admin-dashboard-teams.component.html',
  styleUrls: ['./backend-admin-dashboard-teams.component.scss']
})
export class BackendAdminDashboardTeamsComponent implements OnInit {

  tabIndex = 0;
  loaded = false;

  constructor(public adminService: BackendAdminService) {
  }

  ngOnInit(): void {
  }
}
