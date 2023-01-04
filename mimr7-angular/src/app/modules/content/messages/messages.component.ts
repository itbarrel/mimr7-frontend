import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Message } from 'src/app/shared/interfaces';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  highlightId: string = '';
  name: string = '';
  messages:Message[]=[]

  constructor(
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.highlightId = this.route.snapshot.paramMap.get('hid') || '';
    this.getAllMessages()
  }

  getAllMessages() {
    this.messageService
      .getByHighlightId(this.highlightId, this.name)
      .subscribe((res:any) => {
        console.log(res);
        this.messages= res.data
      });
  }
}
