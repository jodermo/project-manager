import { Light } from 'three';
import { ThreeObject } from '../three-object';
import { LightService } from '../../services/light.service';
import { ObjectService } from '../../services/object.service';


export class ThreeLight extends Light implements ThreeObject {

  updateComponent = () => {
  }

  constructor(public objectService: ObjectService, public lightService: LightService) {
    super();
    lightService.add(this);
  }
}
