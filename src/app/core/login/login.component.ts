import { Web3WrapperService } from './../services/web3wrapper.service';
import { Component, OnInit, HostListener, NgZone  } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authentication: AuthenticationService, private router: Router, private _web3wrap: Web3WrapperService) { }

  ngOnInit() {
    this._web3wrap.checkAndInstantiateWeb3();
    this._web3wrap.onReady();
    this._web3wrap.initAxAgroTokenContract();
    this._web3wrap.AxEuroToken_approve( '0x0051D40C97ca3e7581752689ae2F36Fdbb2365bC', 1,
                                        '0x003A9B54a8Baf82F493c9980C031Ec70CcB2D67a', null);

    }
/*
  @HostListener('window:load')
  windowLoaded() {
    this._web3wrap.checkAndInstantiateWeb3();
    this._web3wrap.onReady();
  }
*/

  login(username, password) {
    this.authentication.login(username, password);
  }

}
