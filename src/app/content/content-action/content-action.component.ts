import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-content-action',
  templateUrl: './content-action.component.html',
  styleUrls: ['./content-action.component.scss'],
})
export class ContentActionComponent {
  highlightId: string = '';
  contentId: string = '';
  showHighlightBtn: boolean = false;
  showMessagesBtn: boolean = false;
  highlightLink: string = '';
  messageLink: string = '';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.highlightId = this.route.snapshot.paramMap.get('hid') || '';
    this.contentId = this.route.snapshot.paramMap.get('id') || '';
    this.checkParams();
  }

  checkParams() {
    this.showHighlightBtn = this.router.url.includes('highlights');
    this.showMessagesBtn = this.router.url.includes('messages');
    console.log(this.router.url.split(''));
    this.highlightLink = `/dashboard/contents/${this.contentId}/highlights`;
    this.messageLink = `/dashboard/contents/${this.contentId}/highlights/${this.highlightId}/messages`;
  }
}
