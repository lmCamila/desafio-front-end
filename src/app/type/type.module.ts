import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypeComponent } from './type/type.component';
import { TypeNewComponent } from './type-new/type-new.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DemoMaterialModule } from '../material-module';
import { TypeAddComponent } from './type-add/type-add.component';
import { TypeListComponent } from './type-list/type-list.component';

@NgModule({
  declarations: [TypeComponent, TypeNewComponent, TypeAddComponent, TypeListComponent],
  imports: [
    CommonModule,
    DemoMaterialModule,
    ReactiveFormsModule
  ],
  entryComponents: [TypeNewComponent],
  exports: [TypeNewComponent, TypeListComponent]
})
export class TypeModule { }
