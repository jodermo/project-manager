import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { AnimationComponent } from '../animation.component';

@Component({
  selector: 'app-animated-image',
  templateUrl: './animated-image.component.html',
  styleUrls: ['./animated-image.component.scss']
})
export class AnimatedImageComponent extends AnimationComponent implements AfterViewInit {

  @Input() src?: string;

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
  }

}
