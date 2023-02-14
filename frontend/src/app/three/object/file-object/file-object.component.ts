import { Component } from '@angular/core';
import { ThreeComponent } from '../../three.component';
import { ThreeFileObject } from './three-file-object';
import { ThreeService } from '../../three.service';
import { ComponentService } from '../../services/component.service';
import { ObjectService } from '../../services/object.service';

@Component({
  selector: 'three-file-object',
  template: ''
})
export class FileObjectComponent extends ThreeFileObject implements ThreeComponent{

  constructor(
    public three: ThreeService,
    public componentService: ComponentService,
    public objectService: ObjectService,
  ) {
    super(objectService);
    componentService.add(this);
    objectService.add(this);
  }
}
