import { Object3D, Vector3 } from 'three';
import { SceneComponent } from '../scene/scene.component';
import { ObjectService } from '../services/object.service';

export interface ThreeObject extends Object3D {
  /**
   * Object's local X position.
   * @default 0
   */
  positionX?: number;

  /**
   * Object's local Y position.
   * @default 0
   */
  positionY?: number;

  /**
   * Object's local Z position.
   * @default 0
   */
  positionZ?: number;

  /**
   * Object's local X rotation in radians.
   * @default 0
   */
  rotationX?: number;

  /**
   * Object's local Yrotation in radians.
   * @default 0
   */
  rotationY?: number;
  /**
   * Object's local Z rotation in radians.
   * @default 0
   */
  rotationZ?: number;

  /**
   * Object's local X scale.
   * @default 0
   */
  scaleX?: number;

  /**
   * Object's local Y scale.
   * @default 0
   */
  scaleY?: number;

  /**
   * Object's local Z scale.
   * @default 0
   */
  scaleZ?: number;


  /**
   * Object's local rotation as a Quaternion, X value.
   * @default 0
   */
  quaternionX?: number;

  /**
   * Object's local rotation as a Quaternion, Y value.
   * @default 0
   */
  quaternionY?: number;

  /**
   * Object's local rotation as a Quaternion, Z value.
   * @default 0
   */
  quaternionZ?: number;

  /**
   * Object's local rotation as a Quaternion, W value.
   * @default 0
   */
  quaternionW?: number;

  /**
   * Look at Vector.
   * @default undefined
   */
  lookAtPosition?: Vector3;

  /**
   * Angular scene component
   * @default undefined
   */
  scene?: SceneComponent | undefined;

  updateComponent?: () => void;

}

export class ThreeObject extends Object3D {


  updateComponent? = ()=>{};

  constructor(public objectService: ObjectService) {
    super();
    objectService.add(this);
  }


}
