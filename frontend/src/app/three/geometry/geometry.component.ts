import { AfterViewInit, Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { BufferGeometry } from 'three';
import { ThreeGeometry } from './three-geometry';
import { ThreeComponent } from '../three.component';
import { SceneComponent } from '../scene/scene.component';
import { ThreeService } from '../three.service';
import { ComponentService } from '../services/component.service';
import { GeometryService } from '../services/geometry.service';

@Component({
  selector: 'three-geometry',
  template: '',
})
export class GeometryComponent extends ThreeGeometry {

  /**
   * Optional name of the object (doesn't need to be unique).
   * @default ''
   */
  @Input() name = '';

  @Input() scene?: SceneComponent;

  constructor(
    public three: ThreeService,
    public componentService: ComponentService,
    public geometryService: GeometryService
  ) {
    super(geometryService);
    componentService.add(this);
  }

}
