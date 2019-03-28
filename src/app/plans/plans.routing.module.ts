import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlansListComponent } from './plans-list/plans-list.component';
import { PlansFormComponent } from './plans-form/plans-form.component';

const planRoute: Routes = [
    { path: 'planner', component: PlansListComponent, children: [
        { path: 'new', component: PlansFormComponent},
        { path: 'edit/:id', component: PlansFormComponent}
    ]}
];

@NgModule({
    imports: [RouterModule.forChild(planRoute)],
    exports: [RouterModule]
})
export class PlanRoutingModule {}
