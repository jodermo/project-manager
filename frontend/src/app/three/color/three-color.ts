import { Color } from 'three';
import { ColorService } from '../services/color.service';

export class ThreeColor extends Color {
  constructor(public colorService: ColorService) {
    super();
    colorService.add(this);
  }
}
