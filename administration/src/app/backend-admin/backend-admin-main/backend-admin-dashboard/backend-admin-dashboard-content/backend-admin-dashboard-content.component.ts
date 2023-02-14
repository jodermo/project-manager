import { Component, OnInit } from '@angular/core';
import { BackendAdminService } from '../../../backend-admin.service';

@Component({
  selector: 'app-backend-admin-dashboard-content',
  templateUrl: './backend-admin-dashboard-content.component.html',
  styleUrls: ['./backend-admin-dashboard-content.component.scss']
})
export class BackendAdminDashboardContentComponent implements OnInit {

  constructor(public adminService: BackendAdminService) { }

  ngOnInit(): void {
  }

}
