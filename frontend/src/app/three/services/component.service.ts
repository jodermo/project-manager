import { Injectable } from '@angular/core';
import { ThreeComponent } from '../three.component';

@Injectable({
  providedIn: 'root'
})
export class ComponentService {

  components: ThreeComponent[] = [];

  add(component: ThreeComponent) {
    if (!this.components.find(existingComponent => component === existingComponent)) {
      this.init(component);
      this.components.push(component);
    }
  }

  init(component: ThreeComponent) {
  }

  afterInit(component: ThreeComponent) {
  }

  update(component: ThreeComponent) {

  }

  destroy(component: ThreeComponent) {
    for (let i = 0; i < this.components.length; i++) {
      if (this.components[i] === component) {
        this.components.splice(i, 1);
        return;
      }
    }
  }

  updateAll() {
    for (const component of this.components) {
      this.update(component);
    }
  }

  destroyAll() {
    for (const component of this.components) {
      this.destroy(component);
    }
  }
}
