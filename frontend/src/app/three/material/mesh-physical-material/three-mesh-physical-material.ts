import { MeshPhysicalMaterial } from 'three';
import { ThreeMaterial } from '../three-material';
import { MaterialService } from '../../services/material.service';

export class ThreeMeshPhysicalMaterial extends MeshPhysicalMaterial implements ThreeMaterial {

  constructor(public materialService: MaterialService) {
    super();
    materialService.add(this);
  }
}
