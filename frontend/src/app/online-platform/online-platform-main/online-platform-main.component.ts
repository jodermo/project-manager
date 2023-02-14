import { Component, OnInit } from '@angular/core';
import { OnlinePlatformService } from '../online-platform.service';

@Component({
  selector: 'app-online-platform-main',
  templateUrl: './online-platform-main.component.html',
  styleUrls: ['./online-platform-main.component.scss']
})
export class OnlinePlatformMainComponent implements OnInit {

  constructor(public platform: OnlinePlatformService) {
  }


  ngOnInit(): void {
  }

}
