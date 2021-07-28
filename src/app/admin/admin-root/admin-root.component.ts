import { Component, HostListener, OnInit } from '@angular/core';
import { Constants } from 'src/app/util/Constants';
import { LocalStorage } from 'src/app/util/localStorage.service';

@Component({
  selector: 'app-admin-root',
  templateUrl: './admin-root.component.html',
  styleUrls: ['./admin-root.component.scss']
})
export class AdminRootComponent implements OnInit {
  userRole: string = '';
  userRoles = Constants.USER_ROLE_ASSIGNMENTS_ADMIN;

  ngOnInit() {
    this.resize(window.innerWidth);
    this._opened = !(window.innerWidth < this._autoCollapseWidth)

    this.userRole = localStorage.getItem(LocalStorage.ROLES);
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

  logout() {
    localStorage.clear();
  }
}
