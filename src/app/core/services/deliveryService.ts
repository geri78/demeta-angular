import { Observable } from 'rxjs';
import { Delivery } from './../dataObjects/delivery';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs/add/observable/of';


@Injectable()
export class DeliveryService {



    constructor(private http: HttpClient) {}



    findDeliveries(
        deliveryId: number, filter = '', sortOrder = 'asc',

        pageNumber = 0, pageSize = 3):  Observable<Delivery[]> {

          const d: Delivery[] = [{'seqNo': 1, 'description' : 'delivery 1', 'duration': 100 },
          {'seqNo': 2, 'description' : 'delivery 2', 'duration': 200 },
          {'seqNo': 3, 'description' : 'delivery 3', 'duration': 300 }] ;

          return Observable.of(d);

        }
/*

        return this.http.get('/farmer/1/deliveries', {

            params: new HttpParams()

                .set('deliveryId', deliveryId.toString())

                .set('filter', filter)

                .set('sortOrder', sortOrder)

                .set('pageNumber', pageNumber.toString())

                .set('pageSize', pageSize.toString())

        }).pipe (res =>  res['payload']);

    }
*/
}
