import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
const USER_ROUTES: Routes = [
  {
    path: '', component: DashboardComponent
  },  
];

@NgModule({
  imports: [RouterModule.forChild(USER_ROUTES)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
