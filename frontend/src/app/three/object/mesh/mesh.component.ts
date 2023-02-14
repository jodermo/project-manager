import { Component, Input, SimpleChanges } from '@angular/core';
import { ThreeMesh } from './three-mesh';
import { BufferGeometry, Material } from 'three';
import { ThreeService } from '../../three.service';
import { SceneComponent } from '../../scene/scene.component';
import { ThreeComponent } from '../../three.component';
import { ComponentService } from '../../services/component.service';
import { ObjectService } from '../../services/object.service';

@Component({
  selector: 'three-mesh',
  template: '',
})
export class MeshComponent extends ThreeMesh implements ThreeComponent {

  /* Mesh */

  @Input() geometry: BufferGeometry = new BufferGeometry();
  @Input() material: Material | Material[] = new Material();
  @Input() morphTargetDictionary?: { [p: string]: number };
  @Input() morphTargetInfluences?: number[];


  @Input() scene?: SceneComponent | undefined;
  @Input() userData: { [key: string]: any; } = {};

  private oldGeometry?: BufferGeometry;

  readonly isMesh: true = true;

  constructor(
    public three: ThreeService,
    public componentService: ComponentService,
    public objectService: ObjectService
  ) {
    super(objectService);
    componentService.add(this);
    objectService.add(this);
    this.assignGeometry();
  }

  private assignGeometry() {
    if (this.geometry && this.geometry !== this.oldGeometry) {
      if (this.oldGeometry) {
        this.oldGeometry.dispose();
      }
      this.oldGeometry = this.geometry;
    }
  }

}
