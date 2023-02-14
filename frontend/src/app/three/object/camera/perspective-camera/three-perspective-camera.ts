import { PerspectiveCamera, Vector3 } from 'three';
import { ThreeCamera } from '../three-camera';
import { ObjectService } from '../../../services/object.service';
import { CameraService } from '../../../services/camera.service';


export class ThreePerspectiveCamera extends PerspectiveCamera implements ThreeCamera {

  constructor(public objectService: ObjectService, public cameraService: CameraService) {
    super();
    objectService.add(this);
    cameraService.add(this);
    this.position.set(50, 50, 50);
    this.lookAt(new Vector3());
  }

  /**
   * Update view size
   * gets triggered from SceneComponent to update camera scales
   */
  updateViewSize(width = 0, height = 0) {
    if (width > 0 && height > 0) {
      this.aspect = width / height;
    }
  }
}
