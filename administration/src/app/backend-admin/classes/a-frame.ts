import { Collada, ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader';
import { NgArModelEntity } from '../../../../../angular-classes/angular-entities/ng.ar-model.entity';
import { NgLocationEntity } from '../../../../../angular-classes/angular-entities/ng.location.entity';
import { NgTaskEntity } from '../../../../../angular-classes/angular-entities/ng.task.entity';
import { NgFileEntity } from '../../../../../angular-classes/angular-entities/ng.file.entity';

export const AFrameModelTypes = ['dae', 'fbx']
export type AFrameModelType = typeof AFrameModelTypes[number];

export class AFrameModel {
  arModel?: NgArModelEntity;
  task?: NgTaskEntity;
  location?: NgLocationEntity;
  image?: NgFileEntity;
  entityEl?: HTMLElement;
  collada?: Collada;
  loaded: boolean = false;

  private callbacks: any = {};


  constructor(public type: AFrameModelType = 'dae', public name: string, public path: string, public onLoaded?: (aFrameModel: AFrameModel) => void) {
  }


  addToEntity(entityEl = this.entityEl) {
    this.entityEl = entityEl;
    if (this.entityEl && this.collada) {
      this.entityEl.setAttribute('do-something-once-loaded', '');
      (this.entityEl as any).object3D.add(this.collada.scene);
    }
    this.loaded = true;
    if (this.onLoaded) {
      this.onLoaded(this);
    }
    this.do('loaded', this);
    return this;
  }


  on(eventName: string, callback: (data?: any) => void) {
    if (!this.callbacks[eventName]) {
      this.callbacks[eventName] = [];
    }
    this.callbacks[eventName].push(callback);
    return this;
  }

  private do(eventName: string, data?: any) {
    if (this.callbacks[eventName]) {
      for (const callback of this.callbacks[eventName]) {
        callback(data);
      }
    }
  }

  setArModel(arModel = this.arModel) {
    this.arModel = arModel;
    return this;
  }

  setTask(task = this.task) {
    this.task = task;
    return this;
  }

  setLocation(location = this.location) {
    this.location = location;
    return this;
  }

  setImage(image = this.image) {
    this.image = image;
    return this;
  }
}


export class AFrame {

  models: AFrameModel[] = [];

  constructor(public aScene: HTMLElement) {

  }

  loadModel(aFrameModel: AFrameModel, entityEl: HTMLElement, onSuccess?: (aFrameModel: AFrameModel) => void, onLoaded?: (aFrameModel: AFrameModel) => void, onError?: (error: ErrorEvent) => void) {
    this.update();
    const existingModel = this.models.find(existingModel => existingModel === aFrameModel);
    if (!existingModel) {
      aFrameModel.onLoaded = onLoaded;
      this.models.push(aFrameModel);
      this.loadCollada(aFrameModel.path, (collada: Collada) => {
        if (aFrameModel.arModel) {
          collada.scene.position.set(
            collada.scene.position.x + parseFloat(aFrameModel.arModel.positionX + ''),
            collada.scene.position.y + parseFloat(aFrameModel.arModel.positionY + ''),
            collada.scene.position.z + parseFloat(aFrameModel.arModel.positionZ + ''),
          );
          collada.scene.rotation.set(
            collada.scene.rotation.x + parseFloat(aFrameModel.arModel.rotationX + ''),
            collada.scene.rotation.y + parseFloat(aFrameModel.arModel.rotationY + ''),
            collada.scene.rotation.z + parseFloat(aFrameModel.arModel.rotationZ + ''),
          );
          collada.scene.scale.set(
            parseFloat(aFrameModel.arModel.scaleX + ''),
            parseFloat(aFrameModel.arModel.scaleY + ''),
            parseFloat(aFrameModel.arModel.scaleZ + ''),
          );
        }
        aFrameModel.collada = collada;
        aFrameModel.addToEntity(entityEl);
        console.log('loadCollada', collada, aFrameModel);
        if (onSuccess) {
          onSuccess(aFrameModel);
        }
      }, onError);
    } else {
      existingModel.addToEntity(entityEl);
      if (onSuccess) {
        onSuccess(existingModel);
      }
    }
  }


  private loadCollada(path: string, onSuccess: (collada: Collada) => void, onError?: (error: ErrorEvent) => void) {
    const loader = new ColladaLoader();
    loader.load(path, (collada: Collada) => {
      onSuccess(collada);
    }, () => {
    }, (error: ErrorEvent) => {
      if (onError) {
        onError(error);
      }
    });
  }

  update() {

  }
}
