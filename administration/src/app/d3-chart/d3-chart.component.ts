import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges, OnDestroy,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {D3ChartService} from './d3-chart.service';

@Component({
  selector: 'app-d3-chart',
  templateUrl: './d3-chart.component.html',
  styleUrls: ['./d3-chart.component.scss']
})
export class D3ChartComponent implements AfterViewInit, OnChanges, OnDestroy {
  @ViewChild('svgContainer', {static: false}) svgContainerRef?: ElementRef;
  @Input() id = 'd3-chart';
  @Input() data?: any[];
  @Input() primaryKey = 'id';
  @Input() parentKey = 'parentId';
  @Input() nameKey = 'name';
  @Input() margin = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };
  @Input() animationDuration = 250;
  @Output() onAddNew = new EventEmitter<any>();
  ready = false;
  loaded = false;
  chartStyle = {
    opacity: 0,
  };
  loadingTime = 1000;

  constructor(public chart: D3ChartService) {
    chart.on('update', () => {
      this.updateChart();
    });
    chart.on('resize', () => {
      this.onResize();
    });
  }

  ngAfterViewInit() {
    this.updateChart();
    setTimeout(() => {
      this.initData();
    }, 0);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.updateChart();
  }

  ngOnDestroy() {
    this.chart.destroy();
  }

  updateChart() {
    this.chart.id = this.id;
    this.chart.data = this.data;
    this.chart.margin = this.margin;
    this.chart.animationDuration = this.animationDuration;
    if (!this.ready) {
      this.createChart();
    }
  }

  initData() {
    this.chart.data = this.data;

  }

  createChart() {
    this.initData();
    if (this.svgContainerRef) {
      this.chart.setContainer(this.svgContainerRef.nativeElement);
      this.ready = this.chart.added;
      setTimeout(() => {
        this.loaded = true;
        this.chartStyle.opacity = 1;
      }, this.loadingTime);
    }
  }

  addNewEntry(newData: any) {
    this.onAddNew.emit(newData);
  }

  onResize() {

  }
}
