import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemoMaterialModule } from '../material-module';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [ModalComponent],
  imports: [
    CommonModule,
    DemoMaterialModule
  ],
  exports: [ModalComponent],
  entryComponents: [ModalComponent]
})
export class CoreModule { }
