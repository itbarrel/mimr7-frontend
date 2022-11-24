import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss'],
})
export class ActionsComponent implements OnInit {
  highlightId: string = '';
  contentId: string = '';
  showHighlightBtn: boolean = false;
  showMessagesBtn: boolean = false;
  highlightLink: string = '';
  messageLink: string = '';
  addLink: string = '/dashboard/home/contents/add';
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.highlightId = this.route.snapshot.paramMap.get('hid') || '';
    this.contentId = this.route.snapshot.paramMap.get('id') || '';
    this.checkParams();
    console.log('content Id', this.contentId);
    console.log('highlight Id', this.highlightId);
    console.log('current active route', this.router.url);
  }

  checkParams() {
    this.showHighlightBtn = this.router.url.includes('highlights');
    this.showMessagesBtn = this.router.url.includes('messages');
    console.log(this.router.url.split(''));
    this.highlightLink = `/dashboard/home/contents/${this.contentId}/highlights`;
    this.messageLink = `/dashboard/home/contents/${this.contentId}/highlights/${this.highlightId}/messages`;
    console.log(this.showHighlightBtn, '---', !this.showMessagesBtn);
    if (this.showHighlightBtn && !this.showMessagesBtn) {
      this.addLink = `/dashboard/home/contents/${this.contentId}/highlights/add`;
    }
    if (this.showMessagesBtn && this.showMessagesBtn) {
      this.addLink = `/dashboard/home/contents/${this.contentId}/highlights/${this.highlightId}/messages/add`;
    }
  }
}
