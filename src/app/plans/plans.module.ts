import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { DemoMaterialModule } from './../material-module';
import { CommonModule } from '@angular/common';
import { NgModule, LOCALE_ID } from '@angular/core';

import { PlansComponent } from './plans/plans.component';
import { PlansListComponent } from './plans-list/plans-list.component';
import { PlansAddButtonComponent } from './plans-add-button/plans-add-button.component';
import { PlanContentComponent } from './plan-content/plan-content.component';
import { PlansFormComponent } from './plans-form/plans-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material';

@NgModule({
  declarations: [
    PlansComponent,
    PlansListComponent,
    PlansAddButtonComponent,
    PlanContentComponent,
    PlansFormComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    FormsModule
  ],
  exports: [
    PlansComponent,
    PlansListComponent
  ],
  entryComponents: [PlansListComponent, PlansComponent, PlansFormComponent],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
  { provide: LOCALE_ID, useValue: 'pt-BR' }]
})
export class PlansModule { }
