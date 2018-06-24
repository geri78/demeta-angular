import { Web3WrapperService } from './../services/web3wrapper.service';
import { Component, OnInit, HostListener, NgZone  } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { User } from '../dataObjects/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActualDSService } from '../services/actualDS.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  form: FormGroup;
  public showLogin = false;
  public buttonName = 'Show';
  private errorFound = true;
  showErrorPassword = false;
  showErrorUserName = false;
  isSpecial = '';
  private formSubmitAttempt: boolean;
  _actUser: User;

  // set the default value of our number
  constructor(private authentication: AuthenticationService,
    private router: Router,
    private _web3wrap: Web3WrapperService) { }

  ngOnInit() {
    this._web3wrap.checkAndInstantiateWeb3();
    this._web3wrap.onReady();
    this._web3wrap.initContracts();
    ActualDSService.getInstance().setWeb3Wrapper(this._web3wrap);
    // debug:
   /* this._web3wrap.AxEuroToken_approve( '0x0051D40C97ca3e7581752689ae2F36Fdbb2365bC', 1,
                                        '0x003A9B54a8Baf82F493c9980C031Ec70CcB2D67a', null);*/
    /*this.form = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]*/
  }

  get stateName() {
    return this.showLogin ? 'show' : 'hide';
  }


  public toggle() {
    this.showLogin = !this.showLogin;

    // CHANGE THE NAME OF THE BUTTON.
    if (this.showLogin) {
      this.buttonName = 'Hide';
    } else {
      this.buttonName = 'Show';
    }
  }

  /*isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  onSubmit() {
    if (this.form.valid) {
      this.authService.login(this.form.value); // {7}
    }
    this.formSubmitAttempt = true;             // {8}
  }*/


/*
  @HostListener('window:load')
  windowLoaded() {
    this._web3wrap.checkAndInstantiateWeb3();
    this._web3wrap.onReady();
  }
*/

  login(username, password) {
    /*this.toggle();*/

    this.isSpecial = 'red';
    if (username === '') {
      this.showErrorUserName = true;
    } else {
      this.showErrorUserName = false;
      this.errorFound = false;
    }
    if (password === '') {
      this.showErrorPassword = true;
    } else {
      this.showErrorPassword = false;
      this.errorFound = false;
    }
    if (!this.errorFound) {
      this.authentication.login(this, username, password);
    }
  }

/*
  public setActUser(o: Object) {
   this._actUser = User.assign(o);
  }

  public getActUser(): User {
    return this._actUser;
  }*/
}
