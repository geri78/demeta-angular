import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fdashboard',
  templateUrl: './fdashboard.component.html',
  styleUrls: ['./fdashboard.component.scss']
})
export class FDashboardComponent implements OnInit {

  public showHistory: boolean;
  constructor() {
    this.showHistory = true;
   }

  ngOnInit() {
  }

}
