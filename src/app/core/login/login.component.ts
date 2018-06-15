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
/*
  ngOnInit() {
    this._web3wrap.checkAndInstantiateWeb3();
    this._web3wrap.onReady();
    this._web3wrap.initAxAgroTokenContract();
    this._web3wrap.AxEuroToken_approve( '0x001C6dFbEDfa738570A4020AFB95564dC1027FDC', 13,
                                        '0x001988b4c0D7Ad7f103D5DB264aB8139A38b8C6a', null);

    }*/
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
