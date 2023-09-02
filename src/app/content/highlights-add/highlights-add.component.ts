import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { Highlight } from 'src/app/shared/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { HighlightService } from '../services/highlight.service';

@Component({
  selector: 'app-highlights-add',
  templateUrl: './highlights-add.component.html',
  styleUrls: ['./highlights-add.component.scss']
})
export class HighlightsAddComponent {
  public Editor: any = ClassicEditor;

  public model = {
    editorData: '<p>Hello, world!</p>',
  };

  highlightId: string = '';
  contentId: string = '';
  // htmlText = '<p>Hello, world!</p>';
  hasFocus = false;
  subject: string = '';
  update: boolean = false;
  @Input() data: Highlight = {
    content: '',
  };
  @Output() cancel = new EventEmitter<string>();
  id: string = '';

  constructor(
    private highlightService: HighlightService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.contentId = this.route.snapshot.paramMap.get('id') || '';
    console.log('kkkk',this.contentId)
    this.checkParams();
  }
  checkParams() {
    if (this.route.snapshot.paramMap.get('edit')) {
      this.update = true;
      this.highlightId = this.route.snapshot.paramMap.get('hid') || '';

      this.highlightService
        .getById(String(this.highlightId))
        .subscribe((res: any) => {
          // patch values in the form
          this.subject = res.highlight.content;
          this.model.editorData = res.highlight.description;
        });
    }
  }
  submit() {
    if (!this.subject || this.subject.length < 3) {
      this.toastr.error('Enter a valid Title');
    } else if (!this.model.editorData || this.model.editorData.length < 6) {
      this.toastr.error('Enter valid Content');
    } else {
      const contentData: Highlight = {
        ContentId: this.contentId,
        content: this.subject,
        description: this.model.editorData,
      };
      if (!this.update) {
        this.highlightService.add(contentData).subscribe((res) => {
          this.toastr.success('Added Sucessfully');
          this.model.editorData = '';
          this.subject = '';
        });
      } else {
        this.highlightService
          .update(this.highlightId, contentData)
          .subscribe((res) => {
            this.toastr.success('Updated Sucessfully');
            this.model.editorData = '';
            this.subject = '';
            this.router.navigateByUrl(`/dashboard/contents/${this.contentId}/highlights`);
          });
      }
    }
  }
}
