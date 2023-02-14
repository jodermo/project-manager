import { AfterViewInit, Component, Input } from '@angular/core';
import { AnimationComponent } from '../animation.component';

@Component({
  selector: 'app-animated-text',
  templateUrl: './animated-text.component.html',
  styleUrls: ['./animated-text.component.scss']
})
export class AnimatedTextComponent extends AnimationComponent implements AfterViewInit {

  @Input() text: string = 'Hello World!';
  @Input() htmlElementType: ('div' | 'p' | 'a' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6') = 'div';


  ngAfterViewInit(): void {
    super.ngAfterViewInit();
  }

  getElement() {
    return `<${this.htmlElementType}>${this.text}</${this.htmlElementType}>`;
  }
}
