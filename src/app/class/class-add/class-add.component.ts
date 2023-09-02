import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { Klass, Content, Organization } from 'src/app/shared/interfaces';
// import { classService } from '../services/content.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ClassService } from '../services/class.service';
import { OrganizationService } from 'src/app/account-organization/services/account-organization.service';


@Component({
  selector: 'app-class-add',
  templateUrl: './class-add.component.html',
  styleUrls: ['./class-add.component.scss']
})
export class ClassAddComponent {
  public Editor: any = ClassicEditor;

  public model = {
    editorData: '',
  };
  organizations: Organization[] = [];
  organizationId: string = '';


  // htmlText = '<p>Hello, world!</p>';
  hasFocus = false;
  subject: string = '';
  update: boolean = false;
  @Input() data: Content = {
    title: '',
  };
  @Output() cancel = new EventEmitter<string>();
  id: string = '';

  constructor(
    private classService: ClassService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private organizationService: OrganizationService

  ) {}
  ngOnInit(): void {
    this.checkParams();
    this.organizationService.getAll({offset:0,limit:100},'').subscribe((res: any) => {
      this.organizations = res.data;
    });
  }
  checkParams() {
    if (this.route.snapshot.paramMap.get('edit')) {
      this.update = true;
      this.id = this.route.snapshot.paramMap.get('id') || '';
      this.classService
        .getById(String(this.id))
        .subscribe((res: any) => {
          console.log("🚀 ~ file: class-add.component.ts:58 ~ ClassAddComponent ~ .subscribe ~ res:", res)
          // patch values in the form
          this.subject = res.klass[0].name;
          this.model.editorData = res.klass[0].description;
          this.organizationId = res.klass[0].OrganizationId
        });
    }
  }
  submit() {
    if (!this.subject || this.subject.length < 3) {
      this.toastr.error('Enter a valid Title');
    } else if (!this.model.editorData|| this.model.editorData.length < 6) {
      this.toastr.error('Enter valid Content');
    } else if (!this.organizationId || this.organizationId.length < 6) {
      this.toastr.error('Select Valid Organization');
    } else {
      const contentData: Klass = {
        name: this.subject,
        description: this.model.editorData,
        OrganizationId: this.organizationId,
      };
      if (!this.update) {
        this.classService.add(contentData).subscribe((res) => {
          this.toastr.success('Added Sucessfully');
          this.model.editorData = '';
          this.subject = '';
          this.organizationId = ''
        });
      } else {
        this.classService
          .update(this.id, contentData)
          .subscribe((res) => {
            this.toastr.success('Updated Sucessfully');
            this.model.editorData = '';
            this.subject = '';
          this.organizationId = ''
            this.router.navigateByUrl('/dashboard/classes');
          });
      }
    }
  }
  // submit() {
  //   if (!this.subject || this.subject.length < 3) {
  //     this.toastr.error('Enter a valid Title');
  //   } else if (!this.model.editorData || this.model.editorData.length < 6) {
  //     this.toastr.error('Enter valid Content');
  //   } else {
  //     const contentData: Content = {
  //       title: this.subject,
  //       description: this.model.editorData,
  //     };
  //     if (!this.update) {
  //       this.classService.add(contentData).subscribe((res) => {
  //         this.toastr.success('Added Sucessfully');
  //         this.model.editorData = '';
  //         this.subject = '';
  //       });
  //     } else {
  //       this.classService
  //         .update(this.contentId, contentData)
  //         .subscribe((res) => {
  //           this.toastr.success('Updated Sucessfully');
  //           this.model.editorData = '';
  //           this.subject = '';
  //           this.router.navigateByUrl('/dashboard/contents');
  //         });
  //     }
  //   }
  // }
}
