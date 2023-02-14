import { Component, OnInit } from '@angular/core';
import { OnlinePlatformService } from '../online-platform.service';

@Component({
  selector: 'app-online-platform-header',
  templateUrl: './online-platform-header.component.html',
  styleUrls: ['./online-platform-header.component.scss']
})
export class OnlinePlatformHeaderComponent implements OnInit {

  constructor(public platform: OnlinePlatformService) {
  }

  ngOnInit(): void {
  }

}
