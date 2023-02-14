import {
  Component, ElementRef,
  Input, ViewChild,
} from '@angular/core';
import { hierarchy, tree } from 'd3-hierarchy'
import { HierarchyNode } from 'd3';
import { TreeNode } from '../../classes/three-node';
import { D3ChartComponent } from '../../d3-chart.component';
import { D3ChartService } from '../../d3-chart.service';

@Component({
  selector: 'app-d3-tree-chart',
  templateUrl: './d3-tree-chart.component.html',
  styleUrls: ['./d3-tree-chart.component.scss']
})
export class D3TreeChartComponent extends D3ChartComponent {
  @ViewChild('svgContainer', {static: false}) svgContainerRef?: ElementRef;

  @Input() id = 'd3-tree-chart';
  @Input() spaceX = 120;
  @Input() spaceY = 60;
  @Input() startLabel = 'Start';
  nodeData: TreeNode[] = [];
  treeData: TreeNode[] = [];
  tree: any;
  root: any;
  treeRoot?: HierarchyNode<any>;
  openIds: number[] = [0];

  constructor(chart: D3ChartService) {
    super(chart);
    this.loadOpenIds();
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();

  }

  onResize() {
    super.onResize();
    this.setChartOffset();
  }

  createChart() {
    super.createChart();
    if (this.chart.svg) {
      if (this.data) {
        this.nodeData = this.data.filter(entry => {
          return entry && !entry[this.parentKey] || entry[this.parentKey] > 0;
        }).map(data => {
          return new TreeNode(
            this,
            data,
            this.primaryKey,
            this.parentKey,
            this.nameKey,
          );
        });
        this.root = new TreeNode(
          this,
          {
            id: 0,
            name: this.startLabel
          },
          this.primaryKey,
          this.parentKey,
          this.nameKey,
          undefined,
          this.nodeData
        );
        this.root.setData(this.nodeData);
        for (const data of this.nodeData) {
          data.parent = this.root;
          data.setData(this.nodeData);
          if (data.data?.id && this.idIsOpen(data.data.id)) {
            data.init(true);
          }
        }
        this.treeData.push(this.root);
        this.root.init(this.idIsOpen(0));
        this.treeRoot = hierarchy(this.root);
        this.tree = tree()
          .size([this.chart.height, this.chart.width])
          .bind(this.treeRoot);
      }
      setTimeout(() => {
        this.setChartOffset();
        this.chart.update();
      }, 0);
    }
  }

  updateChart() {
    super.updateChart();
    for (const node of this.nodeData) {
      node.update();
    }
  }

  idIsOpen(id: number) {
    return this.openIds.find(existingId => parseInt(existingId + '') === parseInt(id + '')) !== undefined;
  }

  addOpenId(id: number) {
    const exist = this.openIds.find(existingId => (existingId === id || id + '' === '0'));
    if (!exist && id) {
      this.openIds.push(id);
    }
    this.saveOpenIds();
  }

  removeOpenId(id: number) {
    if (id) {
      for (let i = 0; i < this.openIds.length; i++) {
        if (parseInt(this.openIds[i] + '') === parseInt(id + '')) {
          this.openIds.splice(i, 1);
          this.saveOpenIds();
          return;
        }
      }
    }
  }

  private loadOpenIds() {
    const openIds = localStorage.getItem(this.id + '-open-node-ids');
    if (openIds) {
      this.openIds = JSON.parse(openIds);
    }
  }

  private saveOpenIds() {
    localStorage.setItem(this.id + '-open-node-ids', JSON.stringify(this.openIds));
  }

  private setChartOffset() {
    this.chart.getSize();
    this.chart.offsetX = (this.chart.width / 2);
    this.chart.offsetY = (this.chart.height / 2);
    this.chart.moveSvgTo();

  }
}
