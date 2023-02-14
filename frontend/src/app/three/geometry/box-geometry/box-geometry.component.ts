import { Component, Input } from '@angular/core';
import { ThreeBoxGeometry } from './three-box-geometry';
import { GeometryService } from '../../services/geometry.service';

@Component({
  selector: 'three-box-geometry',
  template: '',
})
export class BoxGeometryComponent extends ThreeBoxGeometry {
  @Input() width = 1;
  @Input() height = 1;
  @Input() depth = 1;
  @Input() widthSegments = 1;
  @Input() heightSegments = 1;
  @Input() depthSegments = 1;

  parameters = {
    width: this.width,
    height: this.height,
    depth: this.depth,
    widthSegments: this.widthSegments,
    heightSegments: this.heightSegments,
    depthSegments: this.depthSegments
  };

  constructor(public geometryService: GeometryService) {
    super(geometryService);
  }

}
