import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { PlansListComponent } from './plans/plans-list/plans-list.component';
import { TypeListComponent } from './type/type-list/type-list.component';

const appRoute: Routes = [
    { path: '', component: DashboardComponent},
    { path: 'planner', component: PlansListComponent},
    { path: 'type', component: TypeListComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoute)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
