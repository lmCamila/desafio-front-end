import { AppRoutingModule } from './../app.routing.module';
import { DemoMaterialModule } from './../material-module';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    MenuComponent
  ],
  imports: [
    CommonModule,
    DemoMaterialModule,
    AppRoutingModule
  ],
  entryComponents: [
    MenuComponent
  ],
  exports: [
    MenuComponent
  ]
})
export class MenuModule { }
