import { Component, OnInit } from '@angular/core';
import { BackendAdminService } from '../../backend-admin.service';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent implements OnInit {

  constructor(public adminService: BackendAdminService) { }

  ngOnInit(): void {
  }

}
