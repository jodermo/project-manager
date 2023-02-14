import { Component, Input } from '@angular/core';
import { ThreeHemisphereLight } from './three-hemisphere-light';
import { ThreeService } from '../../../three.service';
import { Object3D } from 'three';
import { ThreeComponent } from '../../../three.component';
import { SceneComponent } from '../../../scene/scene.component';
import { Vector3 } from 'three/src/math/Vector3';
import { ComponentService } from '../../../services/component.service';
import { LightService } from '../../../services/light.service';
import { ObjectService } from '../../../services/object.service';

@Component({
  selector: 'three-hemisphere-light',
  template: '',
})
export class HemisphereLightComponent extends ThreeHemisphereLight implements ThreeComponent {

  @Input() name = '';
  @Input() parent: Object3D | null = null;
  @Input() children: Object3D[] = [];
  @Input() up: Vector3 = Object3D.DefaultUp.clone()
  @Input() positionX?: number;
  @Input() positionY?: number;
  @Input() positionZ?: number;
  @Input() rotationX?: number;
  @Input() rotationY?: number;
  @Input() rotationZ?: number;
  @Input() scaleX?: number;
  @Input() scaleY?: number;
  @Input() scaleZ?: number;
  @Input() quaternionX?: number;
  @Input() quaternionY?: number;
  @Input() quaternionZ?: number;
  @Input() quaternionW?: number;
  @Input() scene?: SceneComponent;

  updateComponent = () => {
  }

  constructor(
    public three: ThreeService,
    public componentService: ComponentService,
    public objectService: ObjectService,
    public lightService: LightService) {
    super(objectService, lightService);
    componentService.add(this);
    objectService.add(this);
    lightService.add(this);
  }

}
