import { Configuration } from '../../configuration';
import { HttpClient } from '@angular/common/http';
import { Product } from './../dataObjects/product';
import { Company } from './../dataObjects/company';
import { User } from '../dataObjects/user';
import { Web3WrapperService  } from './web3wrapper.service';
import { Injectable, Inject, InjectionToken } from '@angular/core';


@Injectable()
export class ActualDSService {

private _actUser: User = null;
private _actCompany: Company = null;
private _web3wrap: Web3WrapperService = null;



 private _products: Product[];
// ----------------------------------------------------------
//   public user functions
//
// ----------------------------------------------------------
//  used to get an instance to the actual data objects ( user, person, company, roles, ...)
//
/*
public static getInstance(): ActualDSService {
    if (ActualDSService.s_actDS == null) {
      ActualDSService.s_actDS = new ActualDSService();
    }
    return ActualDSService.s_actDS;
}
*/
// ----------------------------------------------------------
// get the logged in user data
//
public getUser(): User {
  return this._actUser;
}

public getCompany(): Company {
  return this._actCompany;
}


public getWeb3Wrapper() {
  return this._web3wrap;
}


// ----------------------------------------------------------
//   non public functions to fill the ActualDSService


public constructor( private _http: HttpClient) {

  this._products = [];
  this.loadProducts().subscribe( products => { products.forEach(p => { this.addProduct( Product.assign(p)); }); });

}


private addProduct(p: Product) {
  this._products.push(p);
}

private loadProducts(): any {
  return this._http.get( Configuration.apiEndpoint + '/products') ;
}

public setUser(u: User) {
  this._actUser = u;
}

public setCompany(u: Company) {
  this._actCompany = u;
}

public setWeb3Wrapper( w: Web3WrapperService) {
  this._web3wrap = w;
}

public getProduct(id: number): Product {
  if ( id < 0 || this._products == null || id > this._products.length ) {
    return null;
  }  else {
    return this._products[id];
  }
}

public getAllProducts(): Product[] {
  return this._products;
}

}
