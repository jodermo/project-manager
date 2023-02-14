import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges, OnDestroy,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { Camera, Scene, WebGLRenderer } from 'three';
import { FogBase } from 'three/src/scenes/Fog';
import { Material } from 'three/src/materials/Material';
import { Color } from 'three/src/math/Color';
import { Texture } from 'three/src/textures/Texture';
import { ThreeService } from '../three.service';
import { CameraComponent } from '../object/camera/camera.component';
import * as THREE from 'three';
import { CameraControlsComponent } from '../util/camera-controls/camera-controls.component';
import { Octree } from 'three/examples/jsm/math/Octree';
import { OctreeHelper } from 'three/examples/jsm/helpers/OctreeHelper';
import Stats from 'three/examples/jsm/libs/stats.module';
import { ThreeScene } from './three-scene';
import { SceneService } from '../services/scene.service';
import { ObjectService } from '../services/object.service';
import { GeometryService } from '../services/geometry.service';
import { MaterialService } from '../services/material.service';
import { CameraService } from '../services/camera.service';
import { LightService } from '../services/light.service';
import { ColorService } from '../services/color.service';

/**
 * Scenes allow you to set up what and where is to be rendered by three.js. This is where you place objects, lights and cameras.
 */
@Component({
  selector: 'three-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.scss']
})
export class SceneComponent extends ThreeScene implements AfterViewInit, OnDestroy {
  /**
   * HTML scene element reference from Angular component
   * @default undefined
   */
  @ViewChild('htmlElement', {static: false}) htmlElementRef?: ElementRef;

  /**
   * HTML scene element
   * @default undefined
   */
  @Input() htmlElement?: HTMLElement;

  /**
   * A fog instance defining the type of fog that affects everything rendered in the scene. Default is null.
   * @default null
   */
  @Input() fog: FogBase | null = null;

  /**
   * If not null, it will force everything in the scene to be rendered with that material. Default is null.
   * @default null
   */
  @Input() overrideMaterial: Material | null = null;

  /**
   * @default true
   */
  @Input() autoUpdate: boolean = true;

  /**
   * @default null
   */
  @Input() background: null | Color | Texture = null;

  /**
   * @default null
   */
  @Input() environment: null | Texture = null;


  /**
   * three.js renderer
   * @default new WebGLRenderer({antialias: true});
   */
  @Input() renderer = new WebGLRenderer({antialias: true, alpha: true});

  /**
   * Current selected camera
   * @default undefined
   */
  @Input() camera?: Camera;

  /**
   * Available camera components
   * @default undefined
   */
  @Input() cameras: Camera[] = [];

  addedCameras: Camera[] = [];


  /**
   * Camera controls
   * @default undefined
   */
  @Input() cameraControls?: CameraControlsComponent;


  /**
   * Default mesh color
   * @default '#666666'
   */
  @Input() defaultMeshColor = '#666666';


  /**
   * Default line color
   * @default '#ffffff'
   */
  @Input() defaultLineColor = '#ffffff';


  /**
   * Default helper color
   * @default '#00ff00'
   */
  @Input() defaultHelperColor = '#00ff00';


  /**
   * @default true
   */
  active = true;

  /**
   * @default false
   */
  ready = false;

  /**
   * @default false
   */
  loading = false;


  width = 0;
  height = 0;
  pixelRatio = window.devicePixelRatio;
  outputEncoding = THREE.sRGBEncoding;
  shadowMap = true;

  clock = new THREE.Clock();
  octree?: Octree;
  octreeHelper?: OctreeHelper;
  deltaTime = 0;
  stepsPerFrame = 1;
  animationFrame = 0;
  stats: Stats[] = [];


  constructor(
    public three: ThreeService,
    public sceneService: SceneService,
    public objectService: ObjectService,
    public geometryService: GeometryService,
    public materialService: MaterialService,
    public cameraService: CameraService,
    public lightService: LightService,
    public colorService: ColorService,
  ) {
    super();
    sceneService.add(this);
    three.sceneService = sceneService;
    three.objectService = objectService;
    three.geometryService = geometryService;
    three.materialService = materialService;
    three.cameraService = cameraService;
    three.lightService = lightService;
    three.colorService = colorService;


  }


  /**
   * Initialise Angular component
   */
  ngAfterViewInit() {
    this.initHtmlElement();
    this.initRenderer();
    this.initOctree();
    this.initCameras();
    this.updateSizes();
    this.start();
  }

  start() {

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    this.add(directionalLight);
    const helper = new THREE.DirectionalLightHelper(directionalLight, 500);
    //  directionalLight.position.set(100, 200, 400);
    this.add(helper);

    const ambientLight = new THREE.AmbientLight(0x404040); // soft white light
    this.add(ambientLight);


    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
    const cube = new THREE.Mesh(geometry, material);
    this.add(cube);

    this.ready = true;
    this.render();
  }


  /**
   * Destroy Angular component
   */
  ngOnDestroy() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame); // Stop the animation
    }
    this.sceneService.destroy(this);
  }

  /**
   * Set HTML element as scene container
   */
  setHtmlElement(htmlElement?: HTMLElement) {
    this.htmlElement = htmlElement;
  }


  /**
   * Look for HTML element reference from component
   */
  private initHtmlElement() {
    if (this.htmlElementRef?.nativeElement !== this.htmlElement) {
      this.setHtmlElement(this.htmlElementRef?.nativeElement);
    }
  }

  /**
   * Initialise octree for collision detection
   */
  private initOctree() {
    this.octree = new Octree({
      // @ts-ignore
      undeferred: true,
      depthMax: Infinity,
      objectsThreshold: 8,
      overlapPct: 0.15
    });
    this.octreeHelper = new OctreeHelper(this.octree, new Color(this.defaultHelperColor));
  }

  private initRenderer() {
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.setClearColor(0x000000, 0);
    if (this.htmlElement) {
      this.htmlElement.appendChild(this.renderer.domElement);
    }
  }

  /**
   * Initialise camera components
   */
  private initCameras() {
    if (this.camera) {
      this.addCamera(this.camera);
    }
    for (const camera of this.cameras) {
      this.addCamera(camera);
    }
  }

  /**
   * Add camera component
   */
  private addCamera(camera: Camera) {
    const added = this.addedCameras.find(existingCamera => camera === existingCamera);
    if (!added) {
      this.addedCameras.push((camera as CameraComponent));
      this.add(camera);
      const exist = this.cameras.find(existingCamera => camera === existingCamera);
      if (!exist) {
        this.cameras.push(camera);
      }
      if (!this.camera) {
        this.selectCamera(camera);
      }
    }
  }

  /**
   * Select camera component
   */
  selectCamera(camera: Camera) {
    if (camera) {
      this.camera = camera;
    }
  }

  /**
   * Render Scene
   */
  render() {
    if (this.active && this.ready && !this.loading) {
      const delta = this.clock.getDelta();
      this.deltaTime = Math.min(0.05, delta) / this.stepsPerFrame;
      for (let i = 0; i < this.stepsPerFrame; i++) {
        this.updateObjects();
      }
      this.updateCameraControls();
      this.updateCamera();
      this.renderScene();
    }
  }

  private updateRenderer() {
    this.renderer.setPixelRatio(this.pixelRatio);
    this.renderer.setSize(this.width, this.height);
    this.renderer.outputEncoding = this.outputEncoding;
    this.renderer.shadowMap.enabled = this.shadowMap;
  }

  private updateSizes() {
    if (this.htmlElement) {
      this.width = this.htmlElement.clientWidth;
      this.height = this.htmlElement.clientHeight;
      if (this.camera && (this.camera as CameraComponent).updateViewSize) {
        (this.camera as CameraComponent).updateViewSize(this.width, this.height);
      }
      this.updateRenderer();
    }
  }

  /**
   * Update all objects in scene
   */
  private updateObjects() {

  }

  /**
   * Update current camera
   */
  private updateCamera() {

  }

  /**
   * Update camera controls
   */
  private updateCameraControls() {
    if (this.cameraControls) {
      this.cameraControls.update(this.deltaTime);
    }
  }

  /**
   * Render Scene
   */
  private renderScene() {
    for (const stats of this.stats) {
      stats.update();
    }
    if (this.camera) {
      this.renderer.render(this, this.camera);
    }
  }


}
