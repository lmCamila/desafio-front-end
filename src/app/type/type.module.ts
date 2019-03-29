import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DemoMaterialModule } from '../material-module';
import { TypeAddComponent } from './type-add/type-add.component';
import { TypeComponent } from './type/type.component';
import { TypeFormComponent } from './type-form/type-form.component';
import { TypeListComponent } from './type-list/type-list.component';
// import { TypeRoutingModule } from './type.routing.module';

@NgModule({
  declarations: [
    TypeComponent,
    TypeFormComponent,
    TypeAddComponent,
    TypeListComponent
  ],
  imports: [
    CommonModule,
    DemoMaterialModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    TypeFormComponent
  ],
  exports: [
    TypeFormComponent,
    TypeListComponent
  ]
})
export class TypeModule { }
