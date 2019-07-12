import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'main', loadChildren: () => import('./main/main.module').then(mod => mod.MainModule),
  },
  {
    path: 'login', loadChildren: () => import('./login/login.module').then(mod => mod.LoginModule),
  },
  {
    path: '**',
    redirectTo: 'main',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
