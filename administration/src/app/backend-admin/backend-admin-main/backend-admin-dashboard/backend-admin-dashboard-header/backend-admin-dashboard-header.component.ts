import { Component, OnInit } from '@angular/core';
import {BackendAdminService} from "../../../backend-admin.service";

@Component({
  selector: 'app-backend-admin-dashboard-header',
  templateUrl: './backend-admin-dashboard-header.component.html',
  styleUrls: ['./backend-admin-dashboard-header.component.scss']
})
export class BackendAdminDashboardHeaderComponent implements OnInit {

  constructor(public adminService: BackendAdminService) { }


  ngOnInit(): void {
  }

}
