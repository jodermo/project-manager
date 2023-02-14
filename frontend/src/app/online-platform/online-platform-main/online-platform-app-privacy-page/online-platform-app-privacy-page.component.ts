import { Component, OnInit } from '@angular/core';
import { OnlinePlatformService } from '../../online-platform.service';

@Component({
  selector: 'app-online-platform-app-privacy-page',
  templateUrl: './online-platform-app-privacy-page.component.html',
  styleUrls: ['./online-platform-app-privacy-page.component.scss']
})
export class OnlinePlatformAppPrivacyPageComponent implements OnInit {

  constructor(public platform: OnlinePlatformService) {
  }

  ngOnInit(): void {
  }

}
