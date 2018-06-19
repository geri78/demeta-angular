import { Web3WrapperService } from './web3wrapper.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import { Http, Headers, RequestOptions, RequestMethod, ResponseContentType } from '@angular/http';
import { HttpClient, HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders} from '@angular/common/http';
import { LoginComponent } from '../login/login.component';
import { User } from '../login/user';

@Injectable()
export class AuthenticationService {
  private static s_client: string;
  private static s_token: string;
  private static s_uid: string;
  public static s_url: string;

  public _isLoginOK = false;

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

  constructor( private router: Router, private _http: HttpClient, private _web3: Web3WrapperService ) { }

private dologin(login: LoginComponent, username: string, password: string)  {
     const body: string = 'email=' + encodeURIComponent(username) + '&password=' + encodeURIComponent(password);
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


private  processResponse(login: LoginComponent, headers: HttpHeaders, ret: boolean, obj: Object): void {

    if (ret) {
      AuthenticationService.s_uid = headers.get('uid');
      AuthenticationService.s_client = headers.get('client');
      AuthenticationService.s_token = headers.get('access-token');
      // this._data = obj.toString();
      this._isLoginOK = true;
      login.setActUser(obj);
      this.router.navigate(['admin', 'dashboard']);
    } else {
      alert('login failed!');
      this.router.navigate(['login']);
    }
  }

public  login(login: LoginComponent, username: string, password: string) {
    AuthenticationService.s_url = 'https://demeta-rails-staging.herokuapp.com';
    /*this._url = 'https://axgro-demo-server-staging.herokuapp.com/api';*/
    this.dologin(login, username, password);
  }

    /* TESTING: check get user ....
    this._http.get<User>(AuthenticationService.s_url + '/users/'+ data.id).subscribe(data => {
      console.log('User ID: ' + data.id);
      console.log('name: ' + data.name);
      console.log('email: ' + data.email);
    });
    */

public logout() {
   const body: string = 'uid=' +  encodeURIComponent(AuthenticationService.s_uid) +
                        '&access-token=' + encodeURIComponent(AuthenticationService.s_token) +
                        '&client=' + encodeURIComponent(AuthenticationService.s_client);
   this._isLoginOK = false;

   const h: HttpHeaders = new HttpHeaders()
                        .set('Accept', 'application/json')
                        .set('content-type', 'application/x-www-form-urlencoded');

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
    this.router.navigate(['login']);
  }



public  isAuthenticated(): boolean {
    return this._isLoginOK;
  }
}
