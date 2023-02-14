import { Component, OnInit } from '@angular/core';
import { OnlinePlatformService } from '../../online-platform.service';

@Component({
  selector: 'app-online-platform-app-conditions-page',
  templateUrl: './online-platform-app-conditions-page.component.html',
  styleUrls: ['./online-platform-app-conditions-page.component.scss']
})
export class OnlinePlatformAppConditionsPageComponent implements OnInit {

  constructor(public platform: OnlinePlatformService) {
  }

  ngOnInit(): void {
  }

}
