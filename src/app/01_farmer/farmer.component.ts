import { AuthenticationService } from './../core/services/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-farmer',
  templateUrl: './farmer.component.html',
  styleUrls: ['./farmer.component.scss']
})
export class FarmerComponent implements OnInit {

  constructor(private authentication: AuthenticationService ) {

   }

  ngOnInit() {
    const a = this.authentication;
    const b = a.isAuthenticated();
  }

}
