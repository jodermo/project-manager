import { Component, OnInit } from '@angular/core';
import { OnlinePlatformService } from '../../online-platform.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(public platform: OnlinePlatformService) {
  }

  ngOnInit(): void {
  }

}
