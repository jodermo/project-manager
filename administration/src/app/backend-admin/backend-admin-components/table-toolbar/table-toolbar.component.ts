import { Component, OnInit } from '@angular/core';
import { BackendAdminService } from '../../backend-admin.service';

@Component({
  selector: 'app-table-toolbar',
  templateUrl: './table-toolbar.component.html',
  styleUrls: ['./table-toolbar.component.scss']
})
export class TableToolbarComponent implements OnInit {

  constructor(public adminService: BackendAdminService) { }

  ngOnInit(): void {
  }

}
