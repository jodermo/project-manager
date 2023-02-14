import { Component, OnInit } from '@angular/core';
import { BackendAdminService } from '../../../../backend-admin.service';

@Component({
  selector: 'app-backend-admin-dashboard-content-dashboard',
  templateUrl: './backend-admin-dashboard-content-dashboard.component.html',
  styleUrls: ['./backend-admin-dashboard-content-dashboard.component.scss']
})
export class BackendAdminDashboardContentDashboardComponent implements OnInit {
  greeting = 'Hi';

  constructor(public adminService: BackendAdminService) {
    this.greeting = adminService.randomGreeting();
  }

  ngOnInit(): void {

  }

}
