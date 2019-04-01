import { FusionChartsModule } from 'angular-fusioncharts';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DemoMaterialModule } from './../material-module';

// Load FusionCharts
import * as FusionCharts from 'fusioncharts';
// Load Charts module
import * as Charts from 'fusioncharts/fusioncharts.charts';
// Load fusion theme
import * as FusionTheme from 'fusioncharts/themes/fusioncharts.theme.gammel';

// Add dependencies to FusionChartsModule
FusionChartsModule.fcRoot(FusionCharts, Charts, FusionTheme);

@NgModule({
  declarations: [DashboardComponent ],
  imports: [
    CommonModule,
    DemoMaterialModule,
    FusionChartsModule
  ],
  entryComponents: [DashboardComponent ]
})
export class DashboardModule { }
