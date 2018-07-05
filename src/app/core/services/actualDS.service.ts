import { Delivery } from './../dataObjects/delivery';
import { StorageAgreement } from './../dataObjects/storageagreement';
import { environment } from './../../../environments/environment.prod';
// import { Configuration } from '../../configuration';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from './../dataObjects/product';
import { Company } from './../dataObjects/company';
import { User } from '../dataObjects/user';
import { Web3WrapperService  } from './web3wrapper.service';
import { Injectable, Inject, InjectionToken } from '@angular/core';


@Injectable()
export class ActualDSService {

private _actUser: User = null;
private _actCompany: Company = null;
// cache arrays:
private _companies: Company[] = null;
private _users: User[] = null;
private _products: Product[];

private _web3wrap: Web3WrapperService = null;



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

public getDeliveries(): Delivery[] {
  if (this._actCompany != null) {
     return this._actCompany.deliveries;
  }
  return null;
}

// ----------------------------------------------------------
//   non public functions to fill the ActualDSService


public constructor( private _http: HttpClient) {

  this._products = [];
  this._companies = [];
  this._users = [];
  this.loadProducts().subscribe( products => { products.forEach(p => { this.addProduct( Product.assign(p)); }); });

}


private addProduct(p: Product) {
  this._products.push(p);
}

/*
private addCompany(p: Company) {
  console.log ( 'company:' + p.toString());
  this._companies.push(p);
}
*/
private addCompanyStorageAgreements(company: Company, sa: StorageAgreement) {
  console.log ( 'company_id:' + company.id + ' add storageAgreement:'  + sa.toString());
  if ( company.storageAgreements == null) {
    company.storageAgreements = [];
  }
  company.storageAgreements.push(sa);
}

private addCompanyDeliveries(company: Company, de: Delivery) {
  console.log ( 'company_id:' + company.id + ' add delivery:'  + de.toString());
  if ( company.deliveries == null) {
    company.deliveries = [];
  }
  company.deliveries.push(de);
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

private userFindInChache(id: number): User {
  if (this._users != null) {
    let i: number;
    for ( i = 0; i <  this._users.length; i++) {
      if (this._users[i].id === id) {
        console.log('user cache hit id:' + id);
        return this._users[i];
      }
    }
  }
  return null; // not found
}


private addCompany(co: Company) {
  if ( this.companyFindInChache(co.id) == null) {
    this._companies.push( co);
  }
}

private addUser(us: User) {
  if ( this.userFindInChache(us.id) == null) {
    this._users.push( us);
  }
}


// actual record
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
/*
public loadAllCompanies(): any {
  return this._http.get( environment.apiBasePath + '/companies') ;
}
*/

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
    this.addCompany(co);
  }
  return co;
}

// async handling with Promises / .then
async getUserByID(id: number): Promise<User> {
  let us = this.userFindInChache( id );
  if ( us == null) {
    const response = await this._http.get(environment.apiBasePath + '/users/' + id).toPromise();
    us = User.assign(response);
    this.addUser(us);
  }
  return us;
}


// async handling with Promises / .then
async getCompanyStorageAgreements(company: Company) {
  // const companyStorageAgreements: StorageAgreement[] = [];
  const response = await this._http.get<StorageAgreement[]>(environment.apiBasePath + '/companies/' + company.id + '/storage_agreements')
                    .toPromise<StorageAgreement[]>();
  response.forEach(c => {
        const sa = StorageAgreement.assign(c);
        this.addCompanyStorageAgreements(company, sa); });
}

// async handling with Promises / .then
async getCompanyDeliveries(company: Company) {
  const response = await this._http.get<Delivery[]>(environment.apiBasePath + '/companies/' + company.id + '/deliveries')
                    .toPromise<Delivery[]>();
  response.forEach(c => {
                          const sa = Delivery.assign(c);
                          this.addCompanyDeliveries(company, sa); });
}

/*
public getAllCompanies(): Company[] {
  if ( this._companies == null) {
    this._companies = [];
    this.loadAllCompanies().subscribe( companies => { companies.forEach(p => { this.addCompany( Company.assign(p)); }); });

  }
  return this._companies;
}
*/

// create + upd


              /* debug create company...
              c.id = 0;
              c.name = 'testcomp2';
              c.creator_id = 1;
              this._actDSService.createCompany(c)
              .then((val: number) => { console.log(' creation ok'); });
               .then(undefined, (error) => { console.log(error); });
              */

public async createCompany(c: Company): Promise<number> {
    const body = JSON.stringify(c);
    const h: HttpHeaders = new HttpHeaders()
    .set('Accept', 'application/json')
    .set('content-type', 'application/json');

    const response = await this._http.post<Company>(environment.apiBasePath + '/companies', body, {headers: h } )
                            .toPromise<Company>()
                            .catch((error) => { console.log(error); });
      console.log(' createCompany server return:' + response);
      const p = new Promise<number>((resolve, reject) => {
          // if()
      /*    if (response != null && response.id != null ) {
            c.id = response.id;
            // todo: add to cache...
            resolve(response.id);
        } else {
          reject(-1);
        }
      */
      });
    return p;
}


}
