import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { ActualDSService } from '../services/actualDS.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  /*true - shows header always. False, header is hidden at login*/
  public showHeader_bol = false;
  public footer_text = '';
  showHeaderSubscription: any;

  constructor(private authentication: AuthenticationService, private _actDSService: ActualDSService) {
  }

  ngOnInit() {
    this.showHeaderSubscription = this.authentication.getShowHeaderEmitter()
    .subscribe(item => this.showHeader(item));
  }


  showHeader(visible: boolean) {
    this.showHeader_bol = visible;
    //header showed, than also footer gets showed
    if (visible = true) {
      this.setFooterContent();
    }
  }

  setFooterContent() {
    this.footer_text = 'Welcome Gerald Bader and Company : ' + this._actDSService.getCompany().name;
  }

  logout() {
    this.authentication.logout();
  }
}
