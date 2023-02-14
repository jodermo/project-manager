import { Component, Input, SimpleChanges } from '@angular/core';
import { Object3D } from 'three';
import { Vector3 } from 'three/src/math/Vector3';
import { ThreeObject } from './three-object';
import { SceneComponent } from '../scene/scene.component';
import { ThreeService } from '../three.service';
import { ThreeComponent } from '../three.component';
import { ObjectService } from '../services/object.service';
import { ComponentService } from '../services/component.service';

@Component({
  selector: 'three-object',
  template: '',
})
export class ObjectComponent extends ThreeObject implements ThreeComponent {

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
  @Input() lookAtPosition?: Vector3;
  @Input() scene?: SceneComponent;

  constructor(
    public three: ThreeService,
    public componentService: ComponentService,
    public objectService: ObjectService
  ) {
    super(objectService);
    componentService.add(this);
    objectService.add(this);
  }



}
