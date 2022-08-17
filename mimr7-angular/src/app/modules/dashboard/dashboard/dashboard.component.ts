import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
// import { SpinnerService } from 'src/app/core/services/spinner.service';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { PERMISSION } from 'src/assets/data/permission';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav | undefined;
  firstName: string = '';
  lastName: string = '';
  navLinks: any = [];
  constructor(
    // private spinner:SpinnerService,
    private http: HttpClient,
    private auth: AuthenticationService,
    private toaster: ToasterService
  ) {}

  ngOnInit(): void {
    // this.displayNavbar = '1';
    this.auth.getUserState().subscribe((res) => {
      console.log('user state', res);
      this.firstName = res.firstName;
      this.lastName = res.lastName;
    });
    this.getNavigation();
  }
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;

  getNavigation() {
    const role = localStorage.getItem('role');
    const selected = PERMISSION.find((permission) => permission.role === role);
    this.navLinks = selected?.navigation;
    console.log('shapper', this.navLinks);
  }
  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }
}
