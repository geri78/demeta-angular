import { Web3WrapperService } from './web3wrapper.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import { Http, Headers, RequestOptions, RequestMethod, ResponseContentType } from '@angular/http';
import { HttpClient, HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders} from '@angular/common/http';
import { LoginComponent } from '../login/login.component';

@Injectable()
export class AuthenticationService {
  private static s_client: string;
  private static s_token: string;
  private static s_uid: string;
  public static s_url: string;

  public _isLoginOK = false;

  public static prepareHeader(h: HttpHeaders): HttpHeaders {
    if ( AuthenticationService.s_uid != null) {
      h.set('uid', AuthenticationService.s_uid);
      h.set('client', AuthenticationService.s_client);
      h.set('access-token', AuthenticationService.s_token);
    }
    return h;
  }

  constructor( private router: Router, private _http: HttpClient, private _web3: Web3WrapperService ) { }

  public dologin(login: LoginComponent, username: string, password: string)  {
     const body: string = 'email=' + username + '&password=' + password;
    this._isLoginOK = false;

    const h: HttpHeaders = new HttpHeaders()
                         .set('Accept', 'application/json')
                         .set('content-type', 'application/x-www-form-urlencoded');
    /* const h: Headers = new Headers();
    // h.append('content-type', 'application/json');
    // const reqopt = new RequestOptions ( {headers: h} );*/
    // const h: Headers = new Headers();
    // h.append('content-type', 'application/x-www-form-urlencoded; charset=utf-8');
    // h.append('Accept', 'application/json');
    // const rct: ResponseContentType = ResponseContentType.Json;
    // const reqopt = new RequestOptions ( {headers: h , responseType: rct} );

    this._http.post(AuthenticationService.s_url + '/auth/sign_in', body , {headers: h, observe: 'response'} )
    .subscribe(result => {
        console.log(result);
       this.processResponse(login, result.headers, result.ok, result.body);
      },
      error => {
        console.log('error:' + error);
        this.processResponse(null, error.headers, false, error.text());
      }
    );


  }


  processResponse(login: LoginComponent, headers: HttpHeaders, ret: boolean, obj: Object): void {

    if (ret) {
      AuthenticationService.s_uid = headers.get('uid');
      AuthenticationService.s_client = headers.get('client');
      AuthenticationService.s_token = headers.get('access-token');
      // this._data = obj.toString();
      this._isLoginOK = true;
      login.setActUser(obj);
      this.router.navigate(['admin', 'dashboard']);
    } else {
      this.router.navigate(['login']);
    }
  }





  login(login: LoginComponent, username: string, password: string) {
    AuthenticationService.s_url = 'https://demeta-rails-staging.herokuapp.com';
    /*this._url = 'https://axgro-demo-server-staging.herokuapp.com/api';*/
    this.dologin(login, username, password);
  }

  logout() {
    this._isLoginOK = false;
    this.router.navigate(['login']);
  }
  isAuthenticated(): boolean {
    return this._isLoginOK;
  }
}
