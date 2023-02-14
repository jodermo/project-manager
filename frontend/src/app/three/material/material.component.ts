import { AfterViewInit, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Material } from 'three';
import { ThreeMaterial } from './three-material';
import { ThreeComponent } from '../three.component';
import { ThreeService } from '../three.service';
import { SceneComponent } from '../scene/scene.component';
import { ComponentService } from '../services/component.service';
import { MaterialService } from '../services/material.service';

@Component({
  selector: 'three-material',
  template: '',
})
export class MaterialComponent extends ThreeMaterial implements ThreeComponent {

  /**
   * Optional name of the object (doesn't need to be unique).
   * @default ''
   */
  @Input() name = '';
  @Input() scene?: SceneComponent;

  constructor(
    public three: ThreeService,
    public componentService: ComponentService,
    public materialService: MaterialService
  ) {
    super(materialService)
    componentService.add(this);
  }
}
