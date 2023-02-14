import { Injectable } from '@angular/core';
import { ThreeColor } from '../color/three-color';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  colors: ThreeColor[] = [];

  add(color: ThreeColor) {
    if (!this.colors.find(existingColor => color === existingColor)) {
      this.init(color);
      this.colors.push(color);
    }
  }

  init(color: ThreeColor) {

  }

  afterInit(color: ThreeColor) {

  }

  update(color: ThreeColor) {

  }

  destroy(color: ThreeColor) {
    for (let i = 0; i < this.colors.length; i++) {
      if (this.colors[i] === color) {
        this.colors.splice(i, 1);
        return;
      }
    }
  }

  updateAll() {
    for (const color of this.colors) {
      this.update(color);
    }
  }

  destroyAll() {
    for (const color of this.colors) {
      this.destroy(color);
    }
  }
}
