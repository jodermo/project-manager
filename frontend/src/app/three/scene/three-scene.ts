import { Camera, Clock, Scene } from 'three';
import { CameraControlsComponent } from '../util/camera-controls/camera-controls.component';
import { TextureEncoding } from 'three/src/constants';
import { Octree } from 'three/examples/jsm/math/Octree';
import { OctreeHelper } from 'three/examples/jsm/helpers/OctreeHelper';
import Stats from 'three/examples/jsm/libs/stats.module';

export interface ThreeScene extends Scene {

  /**
   * HTML scene element
   * @default undefined
   */
  htmlElement?: HTMLElement;

  camera?: Camera;
  cameras: Camera[];
  addedCameras: Camera[];
  cameraControls?: CameraControlsComponent;
  defaultMeshColor: string;
  defaultLineColor: string;
  defaultHelperColor: string;

  active: boolean;
  ready: boolean;
  loading: boolean;

  width: number;
  height: number;
  pixelRatio: number;
  outputEncoding: TextureEncoding;
  shadowMap: boolean;

  clock: Clock;
  octree?: Octree;
  octreeHelper?: OctreeHelper;
  deltaTime: number;
  stepsPerFrame: number;

  animationFrame?: any;

  stats: Stats[]
}


export class ThreeScene extends Scene {
}
