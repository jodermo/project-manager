import { Component, OnInit } from '@angular/core';
import { BackendAdminService } from '../../backend-admin.service';

@Component({
  selector: 'app-loading-screen',
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.scss']
})
export class LoadingScreenComponent implements OnInit {

  constructor(public adminService: BackendAdminService) { }

  ngOnInit(): void {
  }

}
