import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TypeListComponent } from './type-list/type-list.component';
import { TypeFormComponent } from './type-form/type-form.component';

const typeRoute: Routes = [
    { path: 'type', component: TypeListComponent, children: [
        { path: 'new', component: TypeFormComponent},
        { path: 'edit/:id', component: TypeFormComponent}
    ]}
];

@NgModule({
    imports: [RouterModule.forChild(typeRoute)],
    exports: [RouterModule]
})
export class TypeRoutingModule {}
