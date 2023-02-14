import {Injectable} from '@angular/core';
import {ThreeScene} from '../scene/three-scene';

@Injectable({
  providedIn: 'root'
})
export class SceneService {
  scenes: ThreeScene[] = [];

  add(scene: ThreeScene) {
    if (!this.scenes.find(existingScene => scene === existingScene)) {
      this.init(scene);
      this.scenes.push(scene);
    }
  }

  init(scene: ThreeScene) {
  }

  afterInit(scene: ThreeScene) {
  }

  update(scene: ThreeScene) {

  }

  destroy(scene: ThreeScene) {
    for (let i = 0; i < this.scenes.length; i++) {
      if (this.scenes[i] === scene) {
        this.scenes.splice(i, 1);
        return;
      }
    }
  }

  updateAll() {
    for (const scene of this.scenes) {
      this.update(scene);
    }
  }

  destroyAll() {
    for (const scene of this.scenes) {
      this.destroy(scene);
    }
  }
}
