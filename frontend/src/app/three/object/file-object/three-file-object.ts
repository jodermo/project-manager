import { ThreeObject } from '../three-object';
import { ObjectService } from '../../services/object.service';

export interface ThreeFileObject extends ThreeObject {
  /**
   * File path.
   * @default ''
   */
  path?: string;

}

export class ThreeFileObject extends ThreeObject {

  updateComponent = () => {
  }

  constructor(public objectService: ObjectService) {
    super(objectService);
  }
}
