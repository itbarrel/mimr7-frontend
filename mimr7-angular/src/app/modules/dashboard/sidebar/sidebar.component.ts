import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { PERMISSION } from 'src/assets/data/permission';

export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard', icon: 'nc-bank', class: '' },
  { path: '/icons', title: 'Icons', icon: 'nc-diamond', class: '' },
  { path: '/maps', title: 'Maps', icon: 'nc-pin-3', class: '' },
  {
    path: '/notifications',
    title: 'Notifications',
    icon: 'nc-bell-55',
    class: '',
  },
  { path: '/user', title: 'User Profile', icon: 'nc-single-02', class: '' },
  { path: '/table', title: 'Table List', icon: 'nc-tile-56', class: '' },
  {
    path: '/typography',
    title: 'Typography',
    icon: 'nc-caps-small',
    class: '',
  },
  {
    path: '/upgrade',
    title: 'Upgrade to PRO',
    icon: 'nc-spaceship',
    class: 'active-pro',
  },
];

@Component({
  moduleId: module.id,
  selector: 'app-sidebar',
  templateUrl: 'sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  public menuItems: any[] = [];
  constructor(private auth: AuthenticationService) {}
  ngOnInit() {
    // this.auth.getUserState().subscribe((res) => {
    //   this.firstName = res.firstName;
    //   this.lastName = res.lastName;
    // });
    this.getNavigation();
    // this.menuItems = ROUTES.filter((menuItem) => menuItem);
  }
  getNavigation() {
    const role = localStorage.getItem('role');
    const selected = PERMISSION.find((permission) => permission.role === role);
    this.menuItems = selected?.navigation || []
    // this.navLinks = selected?.navigation;
  }
}
