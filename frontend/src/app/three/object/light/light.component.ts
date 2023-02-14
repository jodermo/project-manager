import { Component, Input } from '@angular/core';
import { ThreeLight } from './three-light';
import { ThreeService } from '../../three.service';
import { SceneComponent } from '../../scene/scene.component';
import { ThreeComponent } from '../../three.component';
import { ComponentService } from '../../services/component.service';
import { ObjectService } from '../../services/object.service';
import { LightService } from '../../services/light.service';

@Component({
  selector: 'three-light',
  template: '',
})
export class LightComponent extends ThreeLight implements ThreeComponent {

  @Input() scene?: SceneComponent;

  constructor(
    public three: ThreeService,
    public componentService: ComponentService,
    public objectService: ObjectService,
    public lightService: LightService,
  ) {
    super(objectService, lightService);
    componentService.add(this);
    objectService.add(this);
    lightService.add(this);
  }

}
