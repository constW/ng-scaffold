import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MainComponent } from './main.component';
import { LoginGuard } from '../core/login.guard';
const MAIN_ROUTES: Routes = [
  {
    path: '', component: MainComponent, canActivate: [LoginGuard], children: [
      { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(mod => mod.DashboardModule) },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(MAIN_ROUTES)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
