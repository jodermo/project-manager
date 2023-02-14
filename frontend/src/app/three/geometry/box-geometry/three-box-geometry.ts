import { BoxGeometry } from 'three';
import { GeometryService } from '../../services/geometry.service';

export class ThreeBoxGeometry extends BoxGeometry {
  constructor(public geometryService: GeometryService) {
    super();
    geometryService.add(this);
  }
}
