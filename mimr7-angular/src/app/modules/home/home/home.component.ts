import { Component, OnInit } from '@angular/core';
import { BreadCrumbService } from 'src/app/shared/services/breadcrumb.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isStudents: boolean = false;
  isClasses: boolean = false;
  isContents: boolean = true;
  addContent: boolean = false;

  constructor(
    private breadCrumbService: BreadCrumbService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.breadCrumbService.setrouteState('Home');
    this.checkRoute();
  }

  changeTab(active: string) {
    switch (active) {
      case 'isStudents':
        this.router.navigateByUrl('/dashboard/home/students');
        break;
      case 'isClasses':
        this.router.navigateByUrl('/dashboard/home/class-lists');
        break;
      case 'isContents':
        this.router.navigateByUrl('/dashboard/home/contents');
        break;
      default:
        break;
      // code block
    }
  }

  checkRoute() {
    const url = this.router.url.split('/');
    console.log('url', url[url.length - 1]);
    let variable: keyof HomeComponent | any = url[url.length - 1];
    switch (variable) {
      case 'students':
        this.isStudents = true;
        this.isClasses = false;
        this.isContents = false;
        break;
      case 'classes':
        this.isStudents = false;
        this.isClasses = true;
        this.isContents = false;
        break;
      case 'contents':
        this.isStudents = false;
        this.isClasses = false;
        this.isContents = true;
        break;
      default:
        this.isStudents = false;
        this.isClasses = true;
        this.isContents = false;
      // code block
    }
  }
}
