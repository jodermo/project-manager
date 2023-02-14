import { Component, OnInit } from '@angular/core';
import { OnlinePlatformService } from '../online-platform.service';

@Component({
  selector: 'app-online-platform-sidebar',
  templateUrl: './online-platform-sidebar.component.html',
  styleUrls: ['./online-platform-sidebar.component.scss']
})
export class OnlinePlatformSidebarComponent implements OnInit {

  constructor(public platform: OnlinePlatformService) {
  }

  ngOnInit(): void {
  }

}
