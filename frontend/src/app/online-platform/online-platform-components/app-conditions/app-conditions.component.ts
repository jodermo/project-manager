import { Component, OnInit } from '@angular/core';
import { OnlinePlatformService } from '../../online-platform.service';
import { appConditionsHtml } from '../../../../../../templates/app-conditions';

@Component({
  selector: 'app-app-conditions',
  template: appConditionsHtml
})
export class AppConditionsComponent implements OnInit {

  constructor(public platform: OnlinePlatformService) {
  }

  ngOnInit(): void {
  }

}
