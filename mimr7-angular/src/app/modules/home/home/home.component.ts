import { Component, OnInit } from '@angular/core';
import { BreadCrumbService } from 'src/app/shared/services/breadcrumb.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  student: boolean = false;
  class: boolean = false;
  content: boolean = true;
  addContent:boolean=false;

  constructor(private breadCrumbService: BreadCrumbService) {}

  ngOnInit(): void {
    this.breadCrumbService.setrouteState('Home');
  }

  changeTab(active: string) {
    switch (active) {
      case 'student':
        this.student = true;
        this.class = false;
        this.content = false;
        break;
      case 'class':
        this.student = false;
        this.class = true;
        this.content = false;
        break;
      case 'content':
        this.student = false;
        this.class = false;
        this.content = true;
        break;
      default:
        this.student = false;
        this.class = true;
        this.content = false;
      // code block
    }
  }
}
