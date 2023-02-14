import { Component, OnInit } from '@angular/core';
import { OnlinePlatformService } from '../../online-platform.service';
import { appPrivacyProtectionHtml } from '../../../../../../templates/app-privacy-protection';

@Component({
  selector: 'app-app-privacy',
  template: appPrivacyProtectionHtml
})
export class AppPrivacyComponent implements OnInit {

  constructor(public platform: OnlinePlatformService) {
  }

  ngOnInit(): void {
  }

}
