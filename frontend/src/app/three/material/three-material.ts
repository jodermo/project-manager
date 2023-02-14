import { Material } from 'three';
import { MaterialService } from '../services/material.service';

export class ThreeMaterial extends Material {

  constructor(public materialService: MaterialService) {
    super();
    materialService.add(this);
  }
}
