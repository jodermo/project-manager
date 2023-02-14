import { Component, OnInit } from '@angular/core';
import { BackendAdminService } from '../backend-admin.service';

@Component({
  selector: 'app-backend-admin-footer',
  templateUrl: './backend-admin-footer.component.html',
  styleUrls: ['./backend-admin-footer.component.scss']
})
export class BackendAdminFooterComponent implements OnInit {

  constructor(public adminService: BackendAdminService) { }

  ngOnInit(): void {
  }

}
