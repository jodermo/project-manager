import {AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {CanvasMarker} from "../../../../../angular-classes/global-classes/canvas-image";

@Component({
  selector: 'app-marker-preview',
  templateUrl: './marker-preview.component.html',
  styleUrls: ['./marker-preview.component.scss']
})
export class MarkerPreviewComponent implements AfterViewInit, OnChanges {

  @ViewChild('markerContainer', {static: false}) containerRef?: ElementRef;

  @Input() src?: string;
  canvasMarker?: CanvasMarker;
  canvasAdded = false;

  constructor() {
  }

  ngAfterViewInit() {
    this.loadMarker();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.loadMarker();
  }

  loadMarker() {
    if (this.src && !this.canvasMarker) {
      this.canvasMarker = new CanvasMarker(this.src);
    }
    if (this.containerRef && this.canvasMarker && !this.canvasAdded) {
      setTimeout(() => {
        if (this.containerRef && this.canvasMarker && !this.canvasAdded) {
          this.containerRef.nativeElement.appendChild(this.canvasMarker.canvas);
          this.canvasAdded = true;
        }
      }, 0);
    }
  }

}
