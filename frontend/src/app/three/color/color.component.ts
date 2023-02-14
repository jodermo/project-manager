import { Component, Input, SimpleChanges } from '@angular/core';
import { Color } from 'three';
import { SceneComponent } from '../scene/scene.component';
import { ThreeColor } from './three-color';
import { ThreeService } from '../three.service';
import { ThreeComponent } from '../three.component';
import { ComponentService } from '../services/component.service';
import { ColorService } from '../services/color.service';

@Component({
  selector: 'three-color',
  template: '',
})
export class ColorComponent extends ThreeColor implements ThreeComponent {


  /**
   * Red channel value between 0 and 1. Default is 1.
   * @default 1
   */
  @Input() r = 1;

  /**
   * Green channel value between 0 and 1. Default is 1.
   * @default 1
   */
  @Input() g = 1;

  /**
   * Blue channel value between 0 and 1. Default is 1.
   * @default 1
   */
  @Input() b = 1;


  /**
   * Blue channel value between 0 and 1. Default is 1.
   * @default 1
   */
  @Input() hexColor?: string;

  @Input() scene?: SceneComponent;
  @Input() userData: { [key: string]: any; } = {};


  constructor(
    public three: ThreeService,
    public componentService: ComponentService,
    public colorService: ColorService
  ) {
    super(colorService);
    componentService.add(this);
  }


  /**
   * Initialise Angular component
   */
  ngAfterViewInit() {
    this.initComponent();
    setTimeout(() => {
      this.afterInitComponent();
      this.updateComponent();
    }, 0);
  }

  /**
   * Detect Angular component changes
   */
  ngOnChanges(changes: SimpleChanges) {
    this.updateComponent();
  }

  /**
   * Detect Angular component destroyed
   */
  ngOnDestroy() {
    this.destroyComponent();
  }

  /**
   * Initialise function for Three.js
   */
  initComponent() {

  }

  /**
   * Initialise function for Three.js
   */
  afterInitComponent() {

  }

  /**
   * Update function for Three.js
   */
  updateComponent() {
    this.updateHex();

  }

  /**
   * Destroy function for Three.js
   */
  destroyComponent() {

  }

  updateHex() {
    if (this.hexColor) {
      this.add(new Color(this.hexColor));
    }
  }


}
