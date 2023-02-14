import { Component, OnInit } from '@angular/core';
import { BackendAdminService } from '../backend-admin.service';

@Component({
  selector: 'app-backend-admin-header',
  templateUrl: './backend-admin-header.component.html',
  styleUrls: ['./backend-admin-header.component.scss']
})
export class BackendAdminHeaderComponent implements OnInit {

  constructor(public adminService: BackendAdminService) { }

  ngOnInit(): void {
  }

}
