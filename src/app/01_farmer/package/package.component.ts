import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-package',
  templateUrl: './Package.component.html',
  styleUrls: ['./Package.component.scss']
})
export class PackageComponent implements OnInit {

  public showHistory: boolean;
  constructor() {
    this.showHistory = true;
   }

  ngOnInit() {
  }

}
