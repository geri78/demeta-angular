import { Web3WrapperService } from './../services/web3wrapper.service';
import { Component, OnInit, HostListener, NgZone  } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
<<<<<<< HEAD
import { User } from './user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
=======
import { ActualDSService } from './../services/actualDS.service';
import { User } from '../dataObjects/user';
>>>>>>> 0eb66a6d7fc816893db7b2ba88ac23f60c91d9bc

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

<<<<<<< HEAD
export class LoginComponent implements OnInit {
  form: FormGroup;
  public show = false;
  public buttonName = 'Show';
  private formSubmitAttempt: boolean;
  _actUser: User;
=======
 // _actUser: User;
>>>>>>> 0eb66a6d7fc816893db7b2ba88ac23f60c91d9bc

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
    return this.show ? 'show' : 'hide';
  }


  toggle() {
    this.show = !this.show;

    // CHANGE THE NAME OF THE BUTTON.
    if (this.show) {
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
    this.authentication.login(this, username, password);
  }

/*
  public setActUser(o: Object) {
   this._actUser = User.assign(o);
  }

  public getActUser(): User {
    return this._actUser;
  }
<<<<<<< HEAD
=======
*/
>>>>>>> 0eb66a6d7fc816893db7b2ba88ac23f60c91d9bc
}
