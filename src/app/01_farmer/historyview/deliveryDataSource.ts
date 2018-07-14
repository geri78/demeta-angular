import { DeliveryService } from '../../core/services/deliveryService';
import { Delivery } from '../../core/dataObjects/delivery';
import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject, Observable } from 'rxjs';
import { CollectionViewer } from '@angular/cdk/collections';
// import 'rxjs/add/observable/of';

export class DeliveryDataSource implements DataSource<Delivery> {
  private deliverySubject = new BehaviorSubject<Delivery[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  constructor(private deliveryService: DeliveryService) {}

  connect(collectionViewer: CollectionViewer): Observable<Delivery[]> {
      return this.deliverySubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
      this.deliverySubject.complete();
      this.loadingSubject.complete();
  }

  loadDeliveries(courseId: number, filter = '',
              sortDirection = 'asc', pageIndex = 0, pageSize = 3) {

      this.loadingSubject.next(true);
      this.deliveryService.findDeliveries()
      .subscribe(deliveries => this.deliverySubject.next(deliveries));
  }
}
