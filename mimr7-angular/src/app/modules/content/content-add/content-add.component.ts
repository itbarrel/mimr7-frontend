import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import 'quill-mention';
import 'quill-emoji';
import { ToastrService } from 'ngx-toastr';
import { Content } from 'src/app/shared/interfaces';
import { ContentService } from '../services/content.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-content-add',
  templateUrl: './content-add.component.html',
  styleUrls: ['./content-add.component.scss'],
})
export class ContentAddComponent implements OnInit {
  htmlText = '';
  hasFocus = false;
  subject: string = '';
  update: boolean = false;
  contentId: string = '';
  @Input() data: Content = {
    title: '',
  };
  @Output() cancel = new EventEmitter<string>();
  id: string = '';

  atValues = [
    { id: 1, value: 'Fredrik Sundqvist', link: 'https://google.com' },
    { id: 2, value: 'Patrik Sjölin' },
  ];
  hashValues = [
    { id: 3, value: 'Fredrik Sundqvist 2' },
    { id: 4, value: 'Patrik Sjölin 2' },
  ];

  quillConfig = {
    //toolbar: '.toolbar',
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'], // toggled buttons
        ['code-block'],
        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: 'ordered' }, { list: 'bullet' }],
        //[{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        //[{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        //[{ 'direction': 'rtl' }],                         // text direction

        //[{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        //[{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        //[{ 'font': [] }],
        //[{ 'align': [] }],

        ['clean'], // remove formatting button

        ['link'],
        //['link', 'image', 'video']
      ],
    },

    mention: {
      allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
      mentionDenotationChars: ['@', '#'],
      source: (searchTerm: any, renderList: any, mentionChar: any) => {
        let values;

        if (mentionChar === '@') {
          values = this.atValues;
        } else {
          values = this.hashValues;
        }

        if (searchTerm.length === 0) {
          renderList(values, searchTerm);
        } else {
          const matches = [];
          for (var i = 0; i < values.length; i++)
            if (
              ~values[i].value.toLowerCase().indexOf(searchTerm.toLowerCase())
            )
              matches.push(values[i]);
          renderList(matches, searchTerm);
        }
      },
    },
    'emoji-toolbar': true,
    'emoji-textarea': false,
    'emoji-shortname': true,
    keyboard: {
      bindings: {
        // shiftEnter: {
        //   key: 13,
        //   shiftKey: true,
        //   handler: (range, context) => {
        //     // Handle shift+enter
        //     console.log("shift+enter")
        //   }
        // },
        enter: {
          key: 13,
          handler: (range: any, context: any) => {
            console.log('enter');
            return true;
          },
        },
      },
    },
  };

  constructor(
    private contentService: ContentService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.checkParams()
  }
  checkParams() {
    if (this.route.snapshot.paramMap.get('edit')) {
      this.update = true;
      this.contentId = this.route.snapshot.paramMap.get('id') || '';
      this.contentService
        .getById(String(this.contentId))
        .subscribe((res: any) => {
          this.subject = res.content.title;
          this.htmlText = res.content.description;
        });
    }
  }
  submit() {
    if (!this.subject || this.subject.length < 3) {
      this.toastr.error('Enter a valid Title');
    } else if (!this.htmlText || this.htmlText.length < 6) {
      this.toastr.error('Enter valid Content');
    } else {
      const contentData: Content = {
        title: this.subject,
        description: this.htmlText,
      };
      if (!this.update) {
        this.contentService.add(contentData).subscribe((res) => {
          this.toastr.success('Added Sucessfully');
          this.htmlText = '';
          this.subject = '';
        });
      } else {
        this.contentService
          .update(this.contentId, contentData)
          .subscribe((res) => {
            this.toastr.success('Updated Sucessfully');
            this.htmlText = '';
            this.subject = '';
            this.router.navigateByUrl('/dashboard/home/content');
          });
      }
    }
  }

  test = (event: any) => {
    console.log(event.keyCode);
  };

  onSelectionChanged = (event: any) => {
    if (event.oldRange == null) {
      this.onFocus();
    }
    if (event.range == null) {
      this.onBlur();
    }
  };

  onContentChanged = (event: any) => {
    //console.log(event.html);
  };

  onFocus = () => {
    console.log('On Focus');
  };
  onBlur = () => {
    console.log('Blurred');
  };
}
