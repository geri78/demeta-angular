import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuardService } from './services/auth-guard.service';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'form',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'admin',
    canActivate: [AuthGuardService],
    loadChildren: '../admin/admin.module#AdminModule'
  },
  {
    path: 'form',
    loadChildren: '../form/form.module#FormModule'
  },
  {
    path: 'farmer',
    loadChildren: '../01_farmer/farmer.module#FarmerModule'
  },
  {
    path: 'warehousekeeper',
    loadChildren: '../01_Warehousekeeper/warehousekeeper.module#WarehousekeeperModule'
  },

  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
