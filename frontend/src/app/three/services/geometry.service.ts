import { Injectable } from '@angular/core';
import { ThreeGeometry } from '../geometry/three-geometry';

@Injectable({
  providedIn: 'root'
})
export class GeometryService {
  geometries: ThreeGeometry[] = [];

  add(geometry: ThreeGeometry) {
    if (!this.geometries.find(existingGeometry => geometry === existingGeometry)) {
      this.init(geometry);
      this.geometries.push(geometry);
    }
  }

  init(geometry: ThreeGeometry) {
  }

  afterInit(geometry: ThreeGeometry) {
  }

  update(geometry: ThreeGeometry) {

  }

  destroy(geometry: ThreeGeometry) {
    for (let i = 0; i < this.geometries.length; i++) {
      if (this.geometries[i] === geometry) {
        this.geometries.splice(i, 1);
        return;
      }
    }
  }

  updateAll() {
    for (const geometry of this.geometries) {
      this.update(geometry);
    }
  }

  destroyAll() {
    for (const geometry of this.geometries) {
      this.destroy(geometry);
    }
  }
}
