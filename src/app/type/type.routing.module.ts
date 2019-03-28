import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TypeListComponent } from './type-list/type-list.component';
import { TypeNewComponent } from './type-new/type-new.component';

const typeRoute: Routes = [
    { path: 'type', component: TypeListComponent, children: [
        { path: 'new', component: TypeNewComponent},
        { path: 'edit/:id', component: TypeNewComponent}
    ]}
];

@NgModule({
    imports: [RouterModule.forChild(typeRoute)],
    exports: [RouterModule]
})
export class TypeRoutingModule {}
