import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DemoMaterialModule } from './../material-module';
import { GoogleChartsModule } from 'angular-google-charts';

@NgModule({
  declarations: [DashboardComponent ],
  imports: [
    CommonModule,
    DemoMaterialModule,
    GoogleChartsModule
  ],
  entryComponents: [DashboardComponent ]
})
export class DashboardModule { }
