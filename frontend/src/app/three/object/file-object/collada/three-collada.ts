import { ThreeFileObject } from '../three-file-object';
import { ObjectService } from '../../../services/object.service';

export interface ThreeCollada extends ThreeFileObject {
  /**
   * File path.
   * @default ''
   */
  path?: string;

}

export class ThreeCollada extends ThreeFileObject {


  constructor(public objectService: ObjectService) {
    super(objectService);
  }

}
