import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  /*true - shows header always. False, header is hidden at login*/
  public showHeader_bol = false;
  showHeaderSubscription: any;

  constructor(private authentication: AuthenticationService) {



  }

  ngOnInit() {
    this.showHeaderSubscription = this.authentication.getShowHeaderEmitter()
    .subscribe(item => this.showHeader(item));
  }


  showHeader(visible: boolean) {
    this.showHeader_bol = visible;
  }

  logout() {
    this.authentication.logout();
  }

}
