import { AfterViewInit, Component, Input } from '@angular/core';
import { ThreeCollada } from './three-collada';
import { ThreeComponent } from '../../../three.component';
import { ThreeService } from '../../../three.service';
import { ComponentService } from '../../../services/component.service';
import { ObjectService } from '../../../services/object.service';
import { SceneComponent } from '../../../scene/scene.component';
import { Collada, ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader';
import { LoadingManager, Object3D } from 'three';

@Component({
  selector: 'three-collada',
  template: ''
})
export class ColladaComponent extends ThreeCollada implements ThreeComponent, AfterViewInit {
  @Input() path = '';
  @Input() scene?: SceneComponent;

  fileObject?: Object3D;

  modelScale = 1000;


  updateComponent = () => {
    if (!this.loading) {
      this.loadFile();
    }
  }


  loadingManager = new LoadingManager(() => {
    if (this.fileObject) {
      this.add(this.fileObject);
    }
  });
  loader = new ColladaLoader(this.loadingManager);
  loading = false;

  constructor(
    public three: ThreeService,
    public componentService: ComponentService,
    public objectService: ObjectService,
  ) {
    super(objectService);
    componentService.add(this);
    objectService.add(this);
  }

  loadFile() {
    if (!this.loading && this.path) {
      this.loading = true;
      this.loader.load(this.path, (collada: Collada) => {
        this.fileObject = collada.scene;
        this.fileObject.scale.set(this.modelScale, this.modelScale, this.modelScale);

        if (this.fileObject) {
          this.add(this.fileObject);
        }
      });
    }

  }

  ngAfterViewInit() {
    this.loadFile();
  }


}
