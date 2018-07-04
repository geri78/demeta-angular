import { Product } from './../dataObjects/product';
import { ActualDSService } from './actualDS.service';
import { Observable } from 'rxjs';
import { Delivery } from './../dataObjects/delivery';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs/add/observable/of';


@Injectable()
export class DeliveryService {



    constructor(private http: HttpClient, private _actDS: ActualDSService) {}



    findDeliveries():  Observable<Delivery[]> {

          const d: Delivery[] = this._actDS.getDeliveries();
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
