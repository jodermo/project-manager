import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { D3ChartComponent } from './d3-chart.component';
import { D3ChartService } from './d3-chart.service';
import { D3TreeChartComponent } from './components/d3-tree-chart/d3-tree-chart.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@NgModule({
  declarations: [
    D3ChartComponent,
    D3TreeChartComponent
  ],
    imports: [
        CommonModule,
        MatProgressSpinnerModule
    ],
  exports: [
    D3TreeChartComponent
  ],
  providers: [
    D3ChartService
  ]
})
export class D3ChartModule { }
