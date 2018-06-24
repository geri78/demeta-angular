import { Component, OnInit, Injectable } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public showHeader_bol = true;

  constructor(private authentication: AuthenticationService) { }

  ngOnInit() {
  }

  showHeader() {
    this.showHeader_bol = true;
  }

  logout() {
    this.authentication.logout();
  }

}
