import { Component, OnInit } from '@angular/core';
import { BackendAdminService } from '../backend-admin.service';

@Component({
  selector: 'app-backend-admin-main',
  templateUrl: './backend-admin-main.component.html',
  styleUrls: ['./backend-admin-main.component.scss']
})
export class BackendAdminMainComponent implements OnInit {

  constructor(public adminService: BackendAdminService) { }

  ngOnInit(): void {
  }

}
