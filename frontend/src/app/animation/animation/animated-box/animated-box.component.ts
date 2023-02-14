import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {AnimationComponent} from "../animation.component";

@Component({
  selector: 'app-animated-box',
  templateUrl: './animated-box.component.html',
  styleUrls: ['./animated-box.component.scss']
})
export class AnimatedBoxComponent extends AnimationComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
  }

}

