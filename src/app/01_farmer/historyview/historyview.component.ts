import { DeliveryService } from '../../core/services/deliveryService';
import { DeliveryDataSource } from './deliveryDataSource';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-farmer-dashboard-history',
  templateUrl: './historyview.component.html',
  styleUrls: ['./historyview.component.scss']
})
export class HistoryViewComponent implements OnInit {

  public displayedColumns = ['id', 'created_at', 'net_weight'];
  public dataSource: DeliveryDataSource;


  constructor(private deliveryService: DeliveryService) { }


  public onRowClicked(row) {
    console.log('Row clicked: ', row);
  }

  ngOnInit() {
    this.dataSource = new DeliveryDataSource(this.deliveryService);

    this.dataSource.loadDeliveries(1);
  }

}
