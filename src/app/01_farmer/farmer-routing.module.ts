import { HistoryViewComponent } from './historyview/historyview.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FarmerComponent } from './farmer.component';
import { FDashboardComponent } from './dashboard/fdashboard.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FarmerRoutingModule { }
