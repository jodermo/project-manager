import { AfterViewInit, Component, Input } from '@angular/core';
import { ThreeService } from '../../../three.service';
import { ThreePerspectiveCamera } from './three-perspective-camera';
import { Object3D, Vector3 } from 'three';
import { ComponentService } from '../../../services/component.service';
import { SceneComponent } from '../../../scene/scene.component';
import { ObjectService } from '../../../services/object.service';
import { CameraService } from '../../../services/camera.service';
import { ObjectComponent } from '../../object.component';

@Component({
  selector: 'three-perspective-camera',
  template: '',
})
export class PerspectiveCameraComponent extends ThreePerspectiveCamera implements ObjectComponent, AfterViewInit {

  type: 'PerspectiveCamera' = 'PerspectiveCamera';


  @Input() zoom = 1;
  @Input() fov = 50;
  @Input() aspect = 1;
  @Input() near = .1;
  @Input() far = 200;
  @Input() focus = 10;
  @Input() view: null | {
    enabled: boolean;
    fullWidth: number;
    fullHeight: number;
    offsetX: number;
    offsetY: number;
    width: number;
    height: number;
  } = null;
  @Input() filmGauge = 35;
  @Input() filmOffset = 0;
  @Input() target = new Vector3();

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

  @Input() userData: { [key: string]: any; } = {};

  readonly isPerspectiveCamera: true = true;

  updateComponent = () => {
  }

  constructor(
    public three: ThreeService,
    public componentService: ComponentService,
    public objectService: ObjectService,
    public cameraService: CameraService
  ) {
    super(objectService, cameraService);
    componentService.add(this);
    objectService.add(this);


  }

  ngAfterViewInit() {
    this.lookAtPosition = new Vector3();
    if (this.scene && !this.scene.cameras.find(camera => camera === this)) {
      this.scene.cameras.push(this);
    }

  }

}
