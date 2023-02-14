import { Component, OnInit } from '@angular/core';
import { OnlinePlatformService } from '../online-platform.service';

@Component({
  selector: 'app-online-platform-footer',
  templateUrl: './online-platform-footer.component.html',
  styleUrls: ['./online-platform-footer.component.scss']
})
export class OnlinePlatformFooterComponent implements OnInit {

  constructor(public platform: OnlinePlatformService) {
  }

  ngOnInit(): void {
  }

}
