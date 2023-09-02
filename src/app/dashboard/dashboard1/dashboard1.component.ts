import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard1',
  templateUrl: './dashboard1.component.html',
  styleUrls: ['./dashboard1.component.scss'],
})
export class Dashboard1Component implements OnInit {
  isStudents: boolean = false;
  isClasses: boolean = false;
  isContents: boolean = true;
  isOrganizations: boolean = false;

  constructor(private router: Router) {
    //constructor
  }
  ngOnInit() {
    this.checkRoute()
  }

  changeTab(active: string) {
    switch (active) {
      case 'isStudents':
        this.router.navigateByUrl('/dashboard/students');
        break;
      case 'isClasses':
        this.router.navigateByUrl('/dashboard/classes');
        break;
      case 'isContents':
        this.router.navigateByUrl('/dashboard/contents');
        break;
      case 'isOrganizations':
        this.router.navigateByUrl('/dashboard/organizations');
        break;
      default:
        break;
      // code block
    }
  }
  checkRoute() {
    const url = this.router.url.split('/');
    console.log('url', url[url.length - 1]);
    let variable: keyof Dashboard1Component | any = url[url.length - 1];
    switch (variable) {
      case 'students':
        this.isStudents = true;
        this.isClasses = false;
        this.isContents = false;
        this.isOrganizations = false;

        break;
      case 'schedules':
        this.isStudents = false;
        this.isClasses = true;
        this.isContents = false;
        this.isOrganizations = false;

        break;
      case 'contents':
        this.isStudents = false;
        this.isClasses = false;
        this.isContents = true;
        this.isOrganizations = false;

        break;
      case 'organizations':
        this.isStudents = false;
        this.isClasses = false;
        this.isContents = false;
        this.isOrganizations = true;

        break;
      default:
        this.isStudents = false;
        this.isClasses = true;
        this.isContents = false;
        this.isOrganizations = false;

      // code block
    }
  }
  // TODO end
}
