import {Injectable} from '@angular/core';
import * as d3 from 'd3';

@Injectable({
  providedIn: 'root'
})
export class D3ChartService {

  id = 'd3-chart';
  margin = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };
  width = 640;
  height = 480;
  x = 0;
  y = 0;
  offsetX = 0;
  offsetY = 0;

  animationDuration = 250;

  container?: HTMLElement;
  svg?: any;
  wrapper?: any;

  data?: any[];

  added = false;

  private callbacks: any = {};

  constructor() {
    window.addEventListener('resize', () => {
      this.resize();
    });
  }


  setContainer(container = this.container) {
    this.container = container;
    if (this.container) {
      this.create();
    }

  }

  create() {
    this.getSize();
    this.removeOldSvg();
    if (this.container && !this.svg) {
      this.svg = d3.select(this.container).append("svg")
        .attr("width", this.width + this.margin.right + this.margin.left)
        .attr("height", this.height + this.margin.top + this.margin.bottom);


      this.svg.append("g")
        .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

      this.wrapper = this.svg.append("g")
        .attr("class", 'chart tree-chart')
        .attr("transform", () => {
          return "translate(" + this.width / 2 + "," + this.height / 2 + ")";
        });

      setTimeout(() => {
        this.getSize();
        this.update();
        this.moveSvgTo();
      }, 0);
    }

  }

  getSize() {
    if (this.container) {
      this.width = this.container.clientWidth;
      this.height = this.container.clientHeight;
      if (this.svg) {
        this.svg
          .attr("width", this.width + this.margin.right + this.margin.left)
          .attr("height", this.height + this.margin.top + this.margin.bottom);
      }
      this.added = true;
    }
  }

  removeOldSvg() {
    if (this.svg) {
      if (this.svg.parentElement) {
        this.svg.parentElement.removeChild(this.svg);
      }
      this.svg.remove();
    }
  }

  update() {
    this.do('update');
  }

  moveSvgTo(x = this.x, y = this.y) {
    this.x = x;
    this.y = y;
    if (this.wrapper) {
      this.wrapper.transition()
        .delay(this.animationDuration / 4)
        .duration(this.animationDuration * 3)
        .attr("transform", "translate(" + (this.offsetX - x) + "," + (this.offsetY - y) + ")");
    }
  }


  resize() {
    this.getSize();
    this.update();
    this.moveSvgTo();
    this.do('resize');
  }

  do(callbackName: string, data?: any) {
    if (this.callbacks[callbackName]) {
      for (let callbackEvent of this.callbacks[callbackName]) {
        callbackEvent(data);
      }
    }
  }

  on(callbackName: string, callbackEvent: (data?: any) => void) {
    if (!this.callbacks[callbackName]) {
      this.callbacks[callbackName] = [];
    }
    this.callbacks[callbackName].push(callbackEvent);
  }

  destroy() {
    this.svg.remove();
    this.svg = undefined;
  }
}
