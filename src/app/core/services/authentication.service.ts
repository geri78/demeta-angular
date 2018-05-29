import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions, RequestMethod } from '@angular/http';


@Injectable()
export class AuthenticationService {

  public _isLoginOK = false;
  private _client: string;
  private _token: string;
  private _uid: string;
  public _data: string;
  public _url: string;

  constructor( private router: Router, private _http: Http ) { }

  public dologin(username: String, password: String)  {
    const body: string = '{"email":"' + username + '","password": "' + password + '"}';
    this._isLoginOK = false;

    const h: Headers = new Headers();
    h.append('content-type', 'application/json');
    const reqopt = new RequestOptions ( {headers: h} );
       this._http.post(this._url + '/auth/sign_in', body, reqopt)
    .subscribe(result => {
      this.processResponse(result.headers, result.ok, result.text());
      },
      error => {
        this.processResponse(error.headers, false, error.text());
      }
    );


  }


  processResponse(headers: Headers, ret: boolean, text: string): void {

    if (ret) {
      this._uid = headers.get('uid');
      this._client = headers.get('client');
      this._token = headers.get('access-token');
      this._data = text;
      this._isLoginOK = true;
      // this._obs.next(2);
      this.router.navigate(['admin', 'dashboard']);
    } else {
      this.router.navigate(['login']);
    }
  }

  public prepareOptions(): RequestOptions {
    const h: Headers = new Headers();
    h.append('uid', this._uid);
    h.append('client', this._client);
    h.append('access-token', this._token);

    return new RequestOptions({headers: h});
  }



  login(username, password) {
    this._url = 'https://axgro-demo-server-staging.herokuapp.com/api';
    this.dologin(username, password);
  }

  logout() {
    this._isLoginOK = false;
    this.router.navigate(['login']);
  }
  isAuthenticated(): boolean {
    return this._isLoginOK;
  }
}
