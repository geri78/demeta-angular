import { Component, OnInit } from '@angular/core';
import { ActualDSService } from '../../core/services/actualDS.service';

@Component({
  selector: 'app-fadmin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class FAdminComponent implements OnInit {
  public email = '';

  constructor(private _actDSService: ActualDSService) { }

  ngOnInit() {
    console.log('Name: ' + this._actDSService.getUser().email);
    this.email = this._actDSService.getUser().email;
  }

}
