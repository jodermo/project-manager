import { Injectable } from '@angular/core';
import { ThreeCamera } from '../object/camera/three-camera';
import { ThreeObject } from '../object/three-object';

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  cameras: ThreeCamera[] = [];

  add(camera: ThreeCamera) {
    if (!this.cameras.find(existingCamera => camera === existingCamera)) {
      this.init(camera);
      this.cameras.push(camera);
    }
  }

  init(camera: ThreeCamera) {

  }

  afterInit(camera: ThreeCamera) {

  }

  update(camera: ThreeCamera) {
    this.updateCameraScene(camera);
  }

  destroy(camera: ThreeCamera) {
    for (let i = 0; i < this.cameras.length; i++) {
      if (this.cameras[i] === camera) {
        this.cameras.splice(i, 1);
        return;
      }
    }
  }

  updateAll() {
    for (const camera of this.cameras) {
      this.update(camera);
    }
  }

  destroyAll() {
    for (const camera of this.cameras) {
      this.destroy(camera);
    }
  }

  private updateCameraScene(object: ThreeObject) {
    if (!object.parent && object.scene) {
      object.scene.add(object);
    }
  }
}
