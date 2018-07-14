import { HistoryViewComponent } from './historyview/historyview.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FarmerComponent } from './farmer.component';
import { FDashboardComponent } from './dashboard/fdashboard.component';
import { FAdminComponent } from './admin/admin.component';
import { PackageComponent } from './package/package.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'fdashboard',
    pathMatch: 'full'
  },
  {
    path: 'fdashboard',
    component: FarmerComponent,
    children: [
      { path: '', component: FDashboardComponent}
    ]
  },
  {
    path: 'fhistory',
    component: FarmerComponent,
    children: [
      { path: '', component: HistoryViewComponent}
    ]
  },
  {
    path: 'fpackage',
    component: FarmerComponent,
    children: [
      { path: '', component: PackageComponent}
    ]
  },
  {
    path: 'fadmin',
    component: FarmerComponent,
    children: [
      { path: '', component: FAdminComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FarmerRoutingModule { }
