import { Mesh } from 'three';
import { ThreeObject } from '../three-object';
import { ObjectService } from '../../services/object.service';

export class ThreeMesh extends Mesh implements ThreeObject {
  constructor(
    public objectService: ObjectService
  ) {
    super();
    objectService.add(this);
  }
}
