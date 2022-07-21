import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
// import { SpinnerService } from 'src/app/core/services/spinner.service';
import { ToasterService } from 'src/app/core/services/toaster.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav | undefined;
  constructor(
    // private spinner:SpinnerService,
    private http: HttpClient,
    private toaster: ToasterService
  ) {}

  ngOnInit(): void {
    // this.displayNavbar = '1';
  }
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;

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
