import { Component, OnInit } from '@angular/core';
import { OnlinePlatformService } from '../../online-platform.service';

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss']
})
export class BackButtonComponent implements OnInit {

  constructor(public platform: OnlinePlatformService) {
  }


  ngOnInit(): void {
  }

}
