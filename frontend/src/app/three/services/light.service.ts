import { Injectable } from '@angular/core';
import { ThreeLight } from '../object/light/three-light';

@Injectable({
  providedIn: 'root'
})
export class LightService {

  lights: ThreeLight[] = [];

  add(light: ThreeLight) {
    if (!this.lights.find(existingLight => light === existingLight)) {
      this.init(light);
      this.lights.push(light);
    }
  }

  init(light: ThreeLight) {
  }

  afterInit(light: ThreeLight) {
  }

  update(light: ThreeLight) {

  }

  destroy(light: ThreeLight) {
    for (let i = 0; i < this.lights.length; i++) {
      if (this.lights[i] === light) {
        this.lights.splice(i, 1);
        return;
      }
    }
  }

  updateAll() {
    for (const light of this.lights) {
      this.update(light);
    }
  }

  destroyAll() {
    for (const light of this.lights) {
      this.destroy(light);
    }
  }
}
