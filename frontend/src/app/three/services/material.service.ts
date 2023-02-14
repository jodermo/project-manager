import { Injectable } from '@angular/core';
import { ThreeMaterial } from '../material/three-material';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  materials: ThreeMaterial[] = [];

  add(material: ThreeMaterial) {
    if (!this.materials.find(existingMaterial => material === existingMaterial)) {
      this.init(material);
      this.materials.push(material);
    }
  }

  init(material: ThreeMaterial) {
  }

  afterInit(material: ThreeMaterial) {
  }

  update(material: ThreeMaterial) {

  }

  destroy(material: ThreeMaterial) {
    for (let i = 0; i < this.materials.length; i++) {
      if (this.materials[i] === material) {
        this.materials.splice(i, 1);
        return;
      }
    }
  }

  updateAll() {
    for (const material of this.materials) {
      this.update(material);
    }
  }

  destroyAll() {
    for (const material of this.materials) {
      this.destroy(material);
    }
  }
}
