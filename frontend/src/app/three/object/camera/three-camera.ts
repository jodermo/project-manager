import { Camera } from 'three';
import { ThreeObject } from '../three-object';
import { ObjectService } from '../../services/object.service';
import { CameraService } from '../../services/camera.service';

export class ThreeCamera extends Camera implements ThreeObject {

  /**
   * Update view size
   * gets triggered from SceneComponent to update camera scales
   */

  constructor(public objectService: ObjectService, public cameraService: CameraService) {
    super();
    objectService.add(this);
    cameraService.add(this);
  }

  updateViewSize(width: number, height: number) {

  }
}
