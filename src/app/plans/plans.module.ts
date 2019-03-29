
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LOCALE_ID, NgModule  } from '@angular/core';
import { MatNativeDateModule } from '@angular/material';
import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

import { DemoMaterialModule } from './../material-module';
import { PlansAddButtonComponent } from './plans-add-button/plans-add-button.component';
import { PlansComponent } from './plans/plans.component';
import { PlanContentComponent } from './plan-content/plan-content.component';
import { PlansFormComponent } from './plans-form/plans-form.component';
import { PlansListComponent } from './plans-list/plans-list.component';
import { PlanRoutingModule } from './plans.routing.module';

registerLocaleData(ptBr);

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
  providers: [{ provide: LOCALE_ID, useValue: 'pt-PT' }]
})
export class PlansModule { }
