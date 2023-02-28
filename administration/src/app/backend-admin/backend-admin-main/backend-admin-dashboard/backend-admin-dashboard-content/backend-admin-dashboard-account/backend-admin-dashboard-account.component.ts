import { Component, OnInit } from '@angular/core';
import {BackendAdminService} from "../../../../backend-admin.service";

@Component({
  selector: 'app-backend-admin-dashboard-account',
  templateUrl: './backend-admin-dashboard-account.component.html',
  styleUrls: ['./backend-admin-dashboard-account.component.scss']
})
export class BackendAdminDashboardAccountComponent implements OnInit {


  constructor(public adminService: BackendAdminService) { }

  ngOnInit(): void {
  }
}
