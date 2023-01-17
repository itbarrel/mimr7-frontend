import { Component, OnInit } from '@angular/core';

import { Content } from 'src/app/shared/interfaces';
import { ClassListService } from '../services/class-list.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from '../../content/services/content.service';
@Component({
  selector: 'app-import-content',
  templateUrl: './import-content.component.html',
  styleUrls: ['./import-content.component.scss'],
})
export class ImportContentComponent implements OnInit {
  availableContent: Content[] = [];
  contents: string[] = [];
  addedFilter: string = '';
  txt: string = 'Add Content';
  importContent: boolean = true;
  classListId: string = '';

  constructor(
    private contentService: ContentService,
    private classListService: ClassListService,
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
      .subscribe((res) => {
        console.log('content by class id', res);
      });
  }

  getClassData() {
    this.classListService.getById(this.classListId).subscribe((res: any) => {
      console.log('already added', res.classList[0].Contents);
      this.availableContent = res.classList[0].Contents;
    });
  }
  submit() {}

  importDeleteStudent(student: Content) {
    this.availableContent.forEach((stu) => {
      // if (student.id === stu.id) {
      //   if (student.checked) {
      //     stu.checked = false;
      //     this.students = this.students.filter((e) => e !== stu.id);
      //   } else {
      //     stu.checked = true;
      //     this.students.push(stu.id || '');
      //   }
      // }
    });
    // console.log('asdasd', this.students);
  }
}
