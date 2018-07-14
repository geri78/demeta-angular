import { environment } from '../../environments/environment.prod';
import { ActualDSService } from './services/actualDS.service';
import { DeliveryService } from './services/deliveryService';
import { NgModule, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreRoutingModule } from './core-routing.module';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RouterModule } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { AuthGuardService } from './services/auth-guard.service';
import { Web3WrapperService } from './services/web3wrapper.service';
import { ApiInterceptorService } from './services/api-interceptor.service';
import { SignupComponent } from './signup/signup.component';


@NgModule({
  imports: [
    CommonModule,
    CoreRoutingModule
  ],
  declarations: [LoginComponent, HeaderComponent, NotFoundComponent, SignupComponent],
  exports: [
    RouterModule,
    HeaderComponent
  ],
  providers: [
    Web3WrapperService,
    ActualDSService,
    AuthenticationService,
    AuthGuardService,
    DeliveryService,
    { provide: HTTP_INTERCEPTORS,
    useClass: ApiInterceptorService,
    multi: true
    }
  ]
})
export class CoreModule { }
