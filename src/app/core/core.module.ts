import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemoMaterialModule } from '../material-module';
import { FooterComponent } from './footer/footer.component';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [ModalComponent,
                 FooterComponent],
  imports: [
    CommonModule,
    DemoMaterialModule
  ],
  exports: [ModalComponent, FooterComponent],
  entryComponents: [ModalComponent]
})
export class CoreModule { }
