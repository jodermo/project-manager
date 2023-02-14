import { Component, OnInit } from '@angular/core';
import { BackendAdminService } from '../../../backend-admin.service';

@Component({
  selector: 'app-backend-admin-dashboard-navigation',
  templateUrl: './backend-admin-dashboard-navigation.component.html',
  styleUrls: ['./backend-admin-dashboard-navigation.component.scss']
})
export class BackendAdminDashboardNavigationComponent implements OnInit {


  constructor(public adminService: BackendAdminService) { }

  ngOnInit(): void {
  }

}
