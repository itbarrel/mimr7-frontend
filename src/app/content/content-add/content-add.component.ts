import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { Content } from 'src/app/shared/interfaces';
import { ContentService } from '../services/content.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-content-add',
  templateUrl: './content-add.component.html',
  styleUrls: ['./content-add.component.scss'],
})
export class ContentAddComponent implements OnInit {
  public Editor: any = ClassicEditor;

  public model = {
    editorData: '<p>Hello, world!</p>',
  };

  // htmlText = '<p>Hello, world!</p>';
  hasFocus = false;
  subject: string = '';
  update: boolean = false;
  contentId: string = '';
  @Input() data: Content = {
    title: '',
  };
  @Output() cancel = new EventEmitter<string>();
  id: string = '';

  constructor(
    private contentService: ContentService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.checkParams();
  }
  checkParams() {
    if (this.route.snapshot.paramMap.get('edit')) {
      this.update = true;
      this.contentId = this.route.snapshot.paramMap.get('id') || '';
      this.contentService
        .getById(String(this.contentId))
        .subscribe((res: any) => {
          // patch values in the form
          this.subject = res.content.title;
          this.model.editorData = res.content.description;
        });
    }
  }
  submit() {
    if (!this.subject || this.subject.length < 3) {
      this.toastr.error('Enter a valid Title');
    } else if (!this.model.editorData || this.model.editorData.length < 6) {
      this.toastr.error('Enter valid Content');
    } else {
      const contentData: Content = {
        title: this.subject,
        description: this.model.editorData,
      };
      if (!this.update) {
        this.contentService.add(contentData).subscribe((res) => {
          this.toastr.success('Added Sucessfully');
          this.model.editorData = '';
          this.subject = '';
        });
      } else {
        this.contentService
          .update(this.contentId, contentData)
          .subscribe((res) => {
            this.toastr.success('Updated Sucessfully');
            this.model.editorData = '';
            this.subject = '';
            this.router.navigateByUrl('/dashboard/contents');
          });
      }
    }
  }
}
