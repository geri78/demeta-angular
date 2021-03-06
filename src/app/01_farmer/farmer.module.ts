
import { CommonModule } from '@angular/common';
import { HistoryViewComponent } from './historyview/historyview.component';
import { NgModule } from '@angular/core';
import { FarmerRoutingModule } from './farmer-routing.module';
import { FarmerComponent } from './farmer.component';
import { FDashboardComponent } from './dashboard/fdashboard.component';
import { MatInputModule, MatPaginatorModule, MatProgressSpinnerModule, MatSortModule, MatTableModule } from '@angular/material';
import { MaterialModule } from '../material/material.module';
import { PackageComponent } from './package/package.component';
import { FAdminComponent } from './admin/admin.component';

@NgModule({
  imports: [
    CommonModule,
    FarmerRoutingModule,
    MaterialModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule
  ],
  declarations: [FarmerComponent, FDashboardComponent, HistoryViewComponent, PackageComponent, FAdminComponent]
})
export class FarmerModule { }
