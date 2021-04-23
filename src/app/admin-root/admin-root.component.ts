import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-root',
  templateUrl: './admin-root.component.html',
  styleUrls: ['./admin-root.component.css']
})
export class AdminRootComponent implements OnInit {

  ngOnInit() {

  }
  
  public _opened: boolean = false;
 
  public _toggleSidebar() {
    this._opened = !this._opened;
  }
}
