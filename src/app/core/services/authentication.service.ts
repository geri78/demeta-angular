// import { Configuration } from './../../configuration';
import { Company } from './../dataObjects/company';
import { ActualDSService } from './actualDS.service';
import { Web3WrapperService } from './web3wrapper.service';
import { Observable } from 'rxjs';
import { Injectable, EventEmitter, Output, isDevMode } from '@angular/core';
import { Router } from '@angular/router';
// import { Http, Headers, RequestOptions, RequestMethod, ResponseContentType } from '@angular/http';
import { HttpClient, HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders} from '@angular/common/http';
import { LoginComponent } from '../login/login.component';
import { HeaderComponent } from '../header/header.component';
import { User } from '../dataObjects/user';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthenticationService {
  private static s_client: string;
  private static s_token: string;
  private static s_uid: string;
  public static s_url: string;

  // public showHeader_bol = false;
  public _isLoginOK = false;

  showHeaderEvt = new EventEmitter<boolean>();


  /*
  * prepareHeader is called from ApiInterceptorService to get the actual access-token
  * which is saved as static data in AuthenticatonService
  */
  public static prepareHeader(h: HttpHeaders): HttpHeaders {
    if ( AuthenticationService.s_uid != null) {
      if (h == null) {
        h = new HttpHeaders();
      }
      h = h.append('uid', AuthenticationService.s_uid);
      h = h.append('client', AuthenticationService.s_client);
      h = h.append('access-token', AuthenticationService.s_token);
    }
    return h;
  }

  constructor(
    private router: Router,
    private _http: HttpClient,
    private _web3: Web3WrapperService,
    private _actDSService: ActualDSService
  ) { }

  public getShowHeaderEmitter(): EventEmitter<boolean> {
    return this.showHeaderEvt;
  }

  private show_Header(visible: boolean) {
    this.showHeaderEvt.emit(visible);
  }


  private dologin(login: LoginComponent, username: string, password: string)  {
    const body: string = 'email=' + encodeURIComponent(username) + '&password=' + encodeURIComponent(password);
    this._isLoginOK = false;

    const h: HttpHeaders = new HttpHeaders()
                         .set('Accept', 'application/json')
                         .set('content-type', 'application/x-www-form-urlencoded');

    this._http.post(environment.apiBasePath + '/auth/sign_in', body , {headers: h, observe: 'response'} )
    .subscribe(result => {
      if (!result.ok) {
        console.log(result);
      }
      this.processResponse(login, result.headers, result.ok, result.body);
      },
      error => {
        console.log('auth/sign_in error:' + error.statusText);
        this.processResponse(null, error.headers, false, error.statusText );
      }
    );


  }


private  processResponse(login: LoginComponent, headers: HttpHeaders, ret: boolean, obj: any): void {

    if (ret) {
      AuthenticationService.s_uid = headers.get('uid');
      AuthenticationService.s_client = headers.get('client');
      AuthenticationService.s_token = headers.get('access-token');
      if   ( isDevMode()) {
        console.log( 'uid:' + AuthenticationService.s_uid );
        console.log( 'client:' + AuthenticationService.s_client );
        console.log( 'access-token:' + AuthenticationService.s_token );
      }
      // this._data = obj.toString();
      this._isLoginOK = true;
      this._actDSService.setUser(User.assign(obj.data));
      // show header
      this.show_Header(true);
      this.router.navigate(['admin', 'dashboard']);
      const cid = this._actDSService.getUser().company_id;
      this._actDSService.getServerCompanyByID(cid)
          .then(c => {
              this._actDSService.setCompany(c);
              this._actDSService.getCompanyStorageAgreements(c);

              // TODO: if farmer: load deliveries
              this._actDSService.getCompanyDeliveries(c);

          } )
          .then(undefined, (error) => { console.log('cant load company with id:' + cid + ' error:' + error); });




      // TEST preload companies ?!?
      // this._actDSService.getAllCompanies();
      // this._actDSService.getServerAllCompanies();
      /*
      this._actDSService.getServerCompanyByID(1).then(c => { console.log(c.toString()); } )
      .then(undefined, (error) => { console.log(error); });
      this._actDSService.getServerCompanyByID(2).then(c => { console.log(c.toString()); } )
      .then(undefined, (error) => { console.log(error); });
      this._actDSService.getServerCompanyByID(1).then(c => { console.log(c.toString()); } )
      .then(undefined, (error) => { console.log(error); });
      this._actDSService.getServerCompanyByID(3).then(c => { console.log(c.toString()); } )
      .then(undefined, (error) => { console.log(error); });
      */

    } else {
      alert('login failed!');
      this.router.navigate(['login']);
    }
  }

  public  login(login: LoginComponent, username: string, password: string) {
    AuthenticationService.s_url = environment.apiBasePath;
    /*this._url = 'https://axgro-demo-server-staging.herokuapp.com/api';*/
    this.dologin(login, username, password);
  }

  public logout() {

  // const c = this._actDSService.getCompanyByID(1);
  // console.log ( 'company:' + c.toString());
  this._actDSService.getServerCompanyByID(1).then(
    c => { console.log('company:' + c.toString());
    });

  const body: string = 'uid=' +  encodeURIComponent(AuthenticationService.s_uid) +
                        '&access-token=' + encodeURIComponent(AuthenticationService.s_token) +
                        '&client=' + encodeURIComponent(AuthenticationService.s_client);
   this._isLoginOK = false;

   const h: HttpHeaders = new HttpHeaders()
                        .set('Accept', 'application/json')
                        .set('content-type', 'application/x-www-form-urlencoded');

    const u: User = this._actDSService.getUser();
    console.log('actual user:' + u.toString());

    this._http.delete(AuthenticationService.s_url + '/auth/sign_out/?' + body,  { observe: 'response'} )
   .subscribe(result => {
       this.doLogout();
     },
     error => {
       console.log('/auth/sign_out error:' + error.statusText);
       alert('Error logging out!');
       // set to logged out anyway !
       this.doLogout();
     }
   );
  }

  private  doLogout() {
    this._isLoginOK = false;
    AuthenticationService.s_uid = null;
    this.show_Header(false);
    this.router.navigate(['login']);
  }



  public  isAuthenticated(): boolean {
    return this._isLoginOK;
  }
}
