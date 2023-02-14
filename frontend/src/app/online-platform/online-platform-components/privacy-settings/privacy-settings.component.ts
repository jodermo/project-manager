import { Component, OnInit } from '@angular/core';
import { OnlinePlatformService } from '../../online-platform.service';

@Component({
  selector: 'app-privacy-settings',
  templateUrl: './privacy-settings.component.html',
  styleUrls: ['./privacy-settings.component.scss']
})
export class PrivacySettingsComponent implements OnInit {

  constructor(public platform: OnlinePlatformService) {
  }

  ngOnInit(): void {
  }

}
