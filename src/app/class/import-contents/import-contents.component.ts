import { Component, OnInit } from '@angular/core';

import { Content } from 'src/app/shared/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from '../../content/services/content.service';
import { ClassService } from '../services/class.service';

@Component({
  selector: 'app-import-contents',
  templateUrl: './import-contents.component.html',
  styleUrls: ['./import-contents.component.scss']
})
export class ImportContentsComponent {
  availableContent: Content[] = [];
  contents: string[] = [];
  addedFilter: string = '';
  txt: string = 'Add Content';
  importContent: boolean = true;
  classListId: string = '';

  constructor(
    private contentService: ContentService,
    private classListService: ClassService,
    private route: ActivatedRoute,
    private toaster: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log(this.route.snapshot.paramMap.get('import'));
    this.classListId = this.route.snapshot.paramMap.get('id') || '';
    if (this.route.snapshot.paramMap.get('import') === 'true') {
      this.getContentByClassId();
    } else {
      this.importContent = false;
      this.txt = 'Remove Content';
      this.getClassData();
    }
  }

  getContentByClassId() {
    this.contentService
      .getContentByClassId(this.classListId)
      .subscribe((res: any) => {
        console.log('content by class id', res);
        this.availableContent = res.Contents;
      });
  }

  getClassData() {
    this.classListService.getById(this.classListId).subscribe((res: any) => {
      console.log('already added', res.classList[0].Contents);
      this.availableContent = res.classList[0].Contents;
    });
  }
  submit() {
    if (this.importContent) {
      this.classListService
        .addContentToClass(this.classListId, this.contents)
        .subscribe((res) => {
          this.toaster.success('content added successfuly');
          this.router.navigateByUrl(`/dashboard/classes`);
          console.log(res);
        });
    } else {
      this.classListService
        .deleteContentFromClass(this.classListId, this.contents)
        .subscribe((res) => {
          this.toaster.success('content deleted successfuly');
          this.router.navigateByUrl(`/dashboard/classes`);

          console.log(res);
        });
    }
  }

  importDeleteStudent(content: Content) {
    this.availableContent.forEach((cntnt) => {
      if (content.id === cntnt.id) {
        if (content.checked) {
          cntnt.checked = false;
          this.contents = this.contents.filter((e) => e !== cntnt.id);
        } else {
          cntnt.checked = true;
          this.contents.push(cntnt.id || '');
        }
      }
    });
    // console.log('asdasd', this.students);
  }
}