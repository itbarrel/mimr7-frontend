import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Message } from 'src/app/shared/interfaces';
import { MessageService } from '../services/message.service';
import { HighlightService } from '../services/highlight.service';

@Component({
  selector: 'app-gpt-messages',
  templateUrl: './gpt-messages.component.html',
  styleUrls: ['./gpt-messages.component.scss'],
})
export class GptMessagesComponent {
  highlightId = '';
  contentId = '';

  GPTMessages: Message[] = [];

  textHtml = 'this is the desc';
  constructor(
    private highlightService: HighlightService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}
  ngOnInit() {
    this.highlightId = this.route.snapshot.paramMap.get('hid') || '';
    this.contentId = this.route.snapshot.paramMap.get('id') || '';
    this.getHighlightbyID();
  }

  getHighlightbyID() {
    this.highlightService.getById(this.highlightId).subscribe((res: any) => {
      this.GPTMessages = res.highlight.GptMessages;
    });
  }

  createGPTmessages() {
    console.log('function called');
    this.highlightService.createGPTMessages(this.highlightId).subscribe(() => {
      this.toastr.success('Message Generated');
      this.getHighlightbyID();
    });
  }

  addGptHighlight(msg: Message) {
    // console.log('hihihih', msg, this.contentId);

    const data: Message = {
      ContentId: this.contentId,
      name: msg.name,
      hint: msg.hint || '',
      solution: msg.solution,
      AccountId: msg.AccountId,
      HighlightId: this.highlightId,
    };
    const messageArr: Message[] = [];
    messageArr.push(data);

    this.messageService.createBulk(messageArr).subscribe(() => {
      this.toastr.success('Message Added into Highligh');
    });
  }
}
