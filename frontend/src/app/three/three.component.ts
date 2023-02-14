import {
  Component,
  Input,
} from '@angular/core';
import { ThreeService } from './three.service';
import { SceneComponent } from './scene/scene.component';
import { ComponentService } from './services/component.service';

@Component({
  selector: 'three',
  template: '',
})
export class ThreeComponent {

  /**
   * Angular scene component
   * @default undefined
   */
  @Input() scene?: SceneComponent;

  /**
   * An object that can be used to store custom data about the Object3d. It should not hold references to functions as these will not be cloned.
   * @default {}
   */
  @Input() userData: { [key: string]: any } = {};


  constructor(public three: ThreeService, public componentService: ComponentService) {
    componentService.add(this);
  }

}
