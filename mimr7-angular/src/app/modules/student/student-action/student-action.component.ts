import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-student-action',
  templateUrl: './student-action.component.html',
  styleUrls: ['./student-action.component.scss'],
})
export class StudentActionComponent implements OnInit {
  addLink: string = '/dashboard/home/contents/add';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.checkParams()
  }


  checkParams() {
    const classes = this.router.url.includes('classes');
    const students = this.router.url.includes('students');
    console.log(this.router.url.split(''));
    console.log(classes, '---', students);
if(classes){
  this.addLink='/dashboard/home/classes/add'
}
if(students){
  this.addLink='/dashboard/home/students/add'
}
    // if (this.showHighlightBtn && !this.showMessagesBtn) {
    //   this.addLink = `/dashboard/home/contents/${this.contentId}/highlights/add`;
    // }
    // if (this.showMessagesBtn && this.showMessagesBtn) {
    //   this.addLink = `/dashboard/home/contents/${this.contentId}/highlights/${this.highlightId}/messages/add`;
    // }
  }
}
