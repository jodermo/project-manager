import { HemisphereLight } from 'three';
import { ThreeLight } from '../three-light';
import { LightService } from '../../../services/light.service';
import { ObjectService } from '../../../services/object.service';

export class ThreeHemisphereLight extends HemisphereLight implements ThreeLight {

  updateComponent = () => {
  }

  constructor(public objectService: ObjectService, public lightService: LightService) {
    super();
    objectService.add(this);
    lightService.add(this);
  }
}
