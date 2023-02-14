import { Injectable } from '@angular/core';
import { ThreeObject } from '../object/three-object';

@Injectable({
  providedIn: 'root'
})
export class ObjectService {

  objects: ThreeObject[] = [];


  add(object: ThreeObject) {
    if (!this.objects.find(existingComponent => object === existingComponent)) {
      this.init(object);
      this.objects.push(object);
    }
  }

  init(object: ThreeObject) {
  }

  afterInit(object: ThreeObject) {
  }

  update(object: ThreeObject) {
    this.updateObjectScene(object);
    this.updateObjectPosition(object);
    this.updateObjectRotation(object);
    this.updateObjectScale(object);
    this.updateObjectQuaternion(object);
    this.updateObjectLookAt(object);
  }

  destroy(object: ThreeObject) {
    for (let i = 0; i < this.objects.length; i++) {
      if (this.objects[i] === object) {
        this.objects.splice(i, 1);
        return;
      }
    }
  }

  updateAll() {
    for (const object of this.objects) {
      this.update(object);
    }
  }

  destroyAll() {
    for (const object of this.objects) {
      this.destroy(object);
    }
  }

  private updateObjectScene(object: ThreeObject) {
    if (!object.parent && object.scene) {
      object.scene.add(object);
    }
  }

  private updateObjectPosition(object: ThreeObject) {
    if (object.positionX) {
      object.position.x = object.positionX;
    }
    if (object.positionY) {
      object.position.y = object.positionY;
    }
    if (object.positionZ) {
      object.position.z = object.positionZ;
    }

  }


  private updateObjectRotation(object: ThreeObject) {
    if (object.rotationX) {
      object.rotation.x = object.rotationX;
    }
    if (object.rotationY) {
      object.rotation.y = object.rotationY;
    }
    if (object.rotationZ) {
      object.rotation.z = object.rotationZ;
    }
  }

  private updateObjectScale(object: ThreeObject) {
    if (object.scaleX) {
      object.scale.x = object.scaleX;
    }
    if (object.scaleY) {
      object.scale.y = object.scaleY;
    }
    if (object.scaleZ) {
      object.scale.z = object.scaleZ;
    }
  }

  private updateObjectQuaternion(object: ThreeObject) {
    if (object.quaternionX) {
      object.quaternion.x = object.quaternionX;
    }
    if (object.quaternionY) {
      object.quaternion.y = object.quaternionY;
    }
    if (object.quaternionZ) {
      object.quaternion.z = object.quaternionZ;
    }
    if (object.quaternionW) {
      object.quaternion.w = object.quaternionW;
    }
  }

  private updateObjectLookAt(object: ThreeObject) {
    if (object.lookAtPosition) {
      object.lookAt(object.lookAtPosition);

    }
  }

}
