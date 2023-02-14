import { Component, Input, SimpleChanges } from '@angular/core';
import { Matrix4 } from 'three/src/math/Matrix4';
import { ThreeCamera } from './three-camera';
import { ObjectComponent } from '../object.component';
import { ThreeService } from '../../three.service';
import { ComponentService } from '../../services/component.service';
import { ThreeComponent } from '../../three.component';
import { ObjectService } from '../../services/object.service';
import { CameraService } from '../../services/camera.service';

@Component({
  selector: 'three-camera',
  template: ''
})
export class CameraComponent extends ThreeCamera implements ThreeComponent {

  /**
   * This is the inverse of matrixWorld. MatrixWorld contains the Matrix which has the world transform of the Camera.
   * @default new THREE.Matrix4()
   */
  @Input() matrixWorldInverse: Matrix4 = new Matrix4();

  /**
   * This is the matrix which contains the projection.
   * @default new THREE.Matrix4()
   */
  @Input() projectionMatrix: Matrix4 = new Matrix4();

  /**
   * This is the inverse of projectionMatrix.
   * @default new THREE.Matrix4()
   */
  @Input() projectionMatrixInverse: Matrix4 = new Matrix4();

  updateComponent = () => {
  }

  readonly isCamera: true = true;

  constructor(public three: ThreeService,
              public componentService: ComponentService,
              public objectService: ObjectService,
              public cameraService: CameraService)
  {
    super(objectService, cameraService);
    componentService.add(this);
  }



}
