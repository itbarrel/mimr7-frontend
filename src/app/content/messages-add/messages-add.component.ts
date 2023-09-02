import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { Highlight, Message } from 'src/app/shared/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-messages-add',
  templateUrl: './messages-add.component.html',
  styleUrls: ['./messages-add.component.scss'],
})
export class MessagesAddComponent {
  public Editor: any = ClassicEditor;

  public model = {
    solution: '<p>Hello, world!</p>',
  };
  messageId: string = '';

  highlightId: string = '';
  contentId: string = '';
  // htmlText = '<p>Hello, world!</p>';
  hasFocus = false;
  name: string = '';
  hint: string = '';
  update: boolean = false;
  @Input() data: Highlight = {
    content: '',
  };
  @Output() cancel = new EventEmitter<string>();
  id: string = '';

  constructor(
    private messageService: MessageService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.contentId = this.route.snapshot.paramMap.get('id') || '';
    this.highlightId = this.route.snapshot.paramMap.get('hid') || '';
    this.checkParams();
  }
  checkParams() {
    if (this.route.snapshot.paramMap.get('edit')) {
      this.update = true;
      this.messageId = this.route.snapshot.paramMap.get('mid') || '';

      this.messageService
        .getById(String(this.messageId))
        .subscribe((res: any) => {
          // patch values in the form
          this.name = res.message.name;
          this.model.solution = res.message.solution;
          this.hint = res.message.hint
        });
    }
  }
  submit() {
    if (!this.name || this.name.length < 3) {
      this.toastr.error('Enter a valid Title');
    } else if (!this.model.solution || this.model.solution.length < 6) {
      this.toastr.error('Enter valid Content');
    } else if (!this.hint || this.hint.length < 3) {
      this.toastr.error('Enter valid Hint');
    } else {
      const contentData: Message = {
        name: this.name,
        hint: this.hint,
        solution: this.model.solution,
        ContentId: this.contentId,
        HighlightId: this.highlightId,
      };
      if (!this.update) {
        this.messageService.add(contentData).subscribe((res) => {
          this.toastr.success('Added Sucessfully');
          this.model.solution = '';
          this.name = '';
          this.hint = '';
        });
      } else {
        this.messageService
          .update(this.messageId, contentData)
          .subscribe((res) => {
            this.toastr.success('Updated Sucessfully');
            this.model.solution = '';
            this.name = '';
            this.hint = '';

            this.router.navigateByUrl(
              `/dashboard/contents/${this.contentId}/highlights/${this.highlightId}/messages`
            );
          });
      }
    }
  }
}
