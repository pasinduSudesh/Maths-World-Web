import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-root',
  templateUrl: './admin-root.component.html',
  styleUrls: ['./admin-root.component.scss']
})
export class AdminRootComponent implements OnInit {

  ngOnInit() {
    this.resize(window.innerWidth);
    this._opened = !(window.innerWidth < this._autoCollapseWidth) 
  }
  
  public _opened: boolean = true;
  public _autoCollapseWidth: number = 560;
  public _mode: string = 'over'


  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.resize(event.target.innerWidth);
  }

  private resize(width) {
    if (width < this._autoCollapseWidth) {
      this._mode = 'slide';
    } else {
      this._mode = 'push';
    }
  }
 
  public _toggleSidebar() {
    this._opened = !this._opened;
  }
}
