import { Component, OnInit } from '@angular/core';
import { BackendAdminService } from './backend-admin.service';

@Component({
  selector: 'app-backend-admin',
  templateUrl: './backend-admin.component.html',
  styleUrls: ['./backend-admin.component.scss']
})
export class BackendAdminComponent implements OnInit {

  constructor(public adminService: BackendAdminService) { }

  ngOnInit(): void {
  }

}
