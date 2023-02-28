import { Component, OnInit } from '@angular/core';
import {BackendAdminService} from "../../../../backend-admin.service";

@Component({
  selector: 'app-backend-admin-dashboard-content-companies',
  templateUrl: './backend-admin-dashboard-content-companies.component.html',
  styleUrls: ['./backend-admin-dashboard-content-companies.component.scss']
})
export class BackendAdminDashboardContentCompaniesComponent implements OnInit {

  tabIndex = 0;
  loaded = false;

  constructor(public adminService: BackendAdminService) {
  }

  ngOnInit(): void {
  }

}
