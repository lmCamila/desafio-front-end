import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypeComponent } from './type.component';
import { TypeNewComponent } from './type-new/type-new.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DemoMaterialModule } from '../material-module';

@NgModule({
  declarations: [TypeComponent, TypeNewComponent],
  imports: [
    CommonModule,
    DemoMaterialModule,
    ReactiveFormsModule
  ],
  entryComponents: [TypeNewComponent],
  exports: [TypeNewComponent]
})
export class TypeModule { }
