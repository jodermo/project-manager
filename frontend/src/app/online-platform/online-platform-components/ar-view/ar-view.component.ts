import { Component, OnInit } from '@angular/core';
import { OnlinePlatformService } from '../../online-platform.service';

@Component({
  selector: 'app-ar-view',
  templateUrl: './ar-view.component.html',
  styleUrls: ['./ar-view.component.scss']
})
export class ArViewComponent implements OnInit {

  constructor(public platform: OnlinePlatformService) {
  }

  ngOnInit(): void {
  }

}
