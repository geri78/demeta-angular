import { environment } from './../../../environments/environment.prod';
// import { Configuration } from '../../configuration';
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
private _companies: Company[] = null;

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
  this._companies = [];
  this.loadProducts().subscribe( products => { products.forEach(p => { this.addProduct( Product.assign(p)); }); });

}


private addProduct(p: Product) {
  this._products.push(p);
}

private addCompany(p: Company) {
  console.log ( 'company:' + p.toString());
  this._companies.push(p);
}

private loadProducts(): any {
  return this._http.get( environment.apiBasePath + '/products') ;
}

private companyFindInChache(id: number): Company {
  if (this._companies != null) {
    let i: number;
    for ( i = 0; i <  this._companies.length; i++) {
      if (this._companies[i].id === id) {
        console.log('company cache hit id:' + id);
        return this._companies[i];
      }
    }
  }
  return null; // not found
}

companyAdd2cache(co: Company) {
  if ( this.companyFindInChache(co.id) == null) {
    this._companies.push( co);
  }
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

public loadAllCompanies(): any {
  return this._http.get( environment.apiBasePath + '/companies') ;
}

// async handling with Promises / .then
async getServerAllCompanies(): Promise<Company[]> {
  this._companies = [];
  const response = await this._http.get<Company[]>(environment.apiBasePath + '/companies').toPromise<Company[]>();
  response.forEach(c => { const co = Company.assign(c); this.addCompany(co); });

  return this._companies;
}

// async handling with Promises / .then
async getServerCompanyByID(id: number): Promise<Company> {
  let co = this.companyFindInChache( id );
  if ( co == null) {
    const response = await this._http.get(environment.apiBasePath + '/companies/' + id).toPromise();
    co = Company.assign(response);
    this.companyAdd2cache(co);
  }
  return co;
}

public getAllCompanies(): Company[] {
  if ( this._companies == null) {
    this._companies = [];
    this.loadAllCompanies().subscribe( companies => { companies.forEach(p => { this.addCompany( Company.assign(p)); }); });

  }
  return this._companies;
}

}
