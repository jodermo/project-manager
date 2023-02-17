import { Component, OnInit } from '@angular/core';
import {BackendAdminService} from "../../../../backend-admin.service";

@Component({
  selector: 'app-backend-admin-dashboard-data',
  templateUrl: './backend-admin-dashboard-data.component.html',
  styleUrls: ['./backend-admin-dashboard-data.component.scss']
})
export class BackendAdminDashboardDataComponent implements OnInit {

  constructor(public adminService: BackendAdminService) {
  }

  ngOnInit(): void {
  }

}
