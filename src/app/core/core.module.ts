import { NgModule } from '@angular/core';
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


@NgModule({
  imports: [
    CommonModule,
    CoreRoutingModule
  ],
  declarations: [LoginComponent, HeaderComponent, NotFoundComponent],
  exports: [
    RouterModule,
    HeaderComponent
  ],
  providers: [
    AuthenticationService,
    AuthGuardService,
    Web3WrapperService,
    { provide: HTTP_INTERCEPTORS,
    useClass: ApiInterceptorService,
    multi: true
    }
  ]
})
export class CoreModule { }
