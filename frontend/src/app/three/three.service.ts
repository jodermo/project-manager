import { Injectable } from '@angular/core';
import { Vector2, Vector3 } from 'three';
import { LightService } from './services/light.service';
import { ObjectService } from './services/object.service';
import { ComponentService } from './services/component.service';
import { CameraService } from './services/camera.service';
import { GeometryService } from './services/geometry.service';
import { MaterialService } from './services/material.service';
import { SceneService } from './services/scene.service';
import { ColorService } from './services/color.service';


@Injectable({
  providedIn: 'root'
})
export class ThreeService {

  settings = {
    consoleLogs: true,
    consoleErrors: true,
    throwErrors: true
  };
  private logData: any[] = [];
  private errorData: any[] = [];

  componentService?: ComponentService;
  sceneService?: SceneService;
  objectService?: ObjectService;
  geometryService?: GeometryService;
  materialService?: MaterialService;
  cameraService?: CameraService;
  lightService?: LightService;
  colorService?: ColorService;

  private animationFrame = 0;


  constructor() {
    this.animate();
  }


  degree(value: number): number {
    return Math.PI / 180 * value;
  }

  vector3(x = 0, y = 0, z = 0): Vector3 {
    return new Vector3(x, y, z);
  }

  vector2(x = 0, y = 0): Vector2 {
    return new Vector2(x, y);
  }

  private animate() {
    this.animationFrame = requestAnimationFrame(() => {
      this.animate();
    });
    this.componentService?.updateAll();
    this.sceneService?.updateAll();
    this.objectService?.updateAll();
    this.geometryService?.updateAll();
    this.materialService?.updateAll();
    this.cameraService?.updateAll();
    this.lightService?.updateAll();
    this.colorService?.updateAll();
  }


  public log(data: any, title = 'Log') {
    if (this.settings.consoleLogs) {
      console.log(title, data);
    }
    this.logData.push({title, data: JSON.stringify(data), time: Date.now()});
  }

  public error(data: any, title = 'Error') {
    if (this.settings.throwErrors) {
      try {
        console.error(title, data);
        throw new Error(title);
      } catch (e) {
        console.log((<Error>e).message);
      }
    } else {
      if (this.settings.consoleErrors) {
        console.error(title, data);
      }
    }
    this.errorData.push({title, data: JSON.stringify(data), time: Date.now()});
  }

  logs() {
    const logs = [];
    for (const log of this.logData) {
      logs.push({
        title: log.title,
        data: JSON.parse(log.data),
        time: log.time,
      });
    }
    return logs;
  }

  errors() {
    const errors = [];
    for (const error of this.errorData) {
      errors.push({
        title: error.title,
        data: JSON.parse(error.data),
        time: error.time,
      });
    }
    return errors;
  }


}
