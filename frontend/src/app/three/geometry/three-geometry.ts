import { BufferGeometry } from 'three';
import { GeometryService } from '../services/geometry.service';


export class ThreeGeometry extends BufferGeometry {
  constructor(public geometryService: GeometryService) {
    super();
    geometryService.add(this);
  }
}
