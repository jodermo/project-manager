import { Component, OnInit } from '@angular/core';
import { BackendAdminService } from '../../backend-admin.service';

@Component({
  selector: 'app-backend-admin-dashboard',
  templateUrl: './backend-admin-dashboard.component.html',
  styleUrls: ['./backend-admin-dashboard.component.scss']
})
export class BackendAdminDashboardComponent implements OnInit {

  constructor(public adminService: BackendAdminService) { }

  ngOnInit(): void {
  }

}
