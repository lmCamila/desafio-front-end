import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { DemoMaterialModule } from './../material-module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PlansComponent } from './plans/plans.component';
import { PlansListComponent } from './plans-list/plans-list.component';
import { PlansAddButtonComponent } from './plans-add-button/plans-add-button.component';
import { PlanContentComponent } from './plan-content/plan-content.component';

@NgModule({
  declarations: [
    PlansComponent,
    PlansListComponent,
    PlansAddButtonComponent,
    PlanContentComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    HttpClientModule
  ],
  exports: [
    PlansComponent,
    PlansListComponent
  ],
  entryComponents: [PlansListComponent, PlansComponent]
})
export class PlansModule { }
