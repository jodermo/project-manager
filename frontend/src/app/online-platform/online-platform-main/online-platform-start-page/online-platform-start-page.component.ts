import { Component, OnInit } from '@angular/core';
import { OnlinePlatformService } from '../../online-platform.service';

@Component({
  selector: 'app-online-platform-start-page',
  templateUrl: './online-platform-start-page.component.html',
  styleUrls: ['./online-platform-start-page.component.scss']
})
export class OnlinePlatformStartPageComponent implements OnInit {

  constructor(public platform: OnlinePlatformService) {

  }

  ngOnInit(): void {
  }

}
