import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/service/auth.service';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent {

  page = {
    limit: 10,
    count: 0,
    offset: 0,
    orderBy: '',
    orderDir: '',
  };

  rows: Object[];
  title: string = '';

  data: any[] = [];
  columns = [
    { name: 'name' },
    { name: 'email' },
    { name: 'mobilePhone' },
    { name: 'createdAt' },
  ];

  constructor(private studentService: StudentService, private authService:AuthService) {}
  ngOnInit() {
    this.getAllContents();
    this.authService.getUser().subscribe(res=>{
      console.log(res)
    })
  }

  pageCallback(pageInfo: {
    count?: number;
    pageSize?: number;
    limit?: number;
    offset?: number;
  }) {
    this.page.offset = pageInfo.offset || 0;
    this.getAllContents();
  }

  sortCallback(sortInfo: {
    sorts: { dir: string; prop: string }[];
    column: {};
    prevValue: string;
    newValue: string;
  }) {
    this.page.orderDir = sortInfo.sorts[0].dir;
    this.page.orderBy = sortInfo.sorts[0].prop;
    this.getAllContents();
  }

  getAllContents() {
    console.log('page', this.page);
    this.studentService
      .getAll(this.page, this.title)
      .subscribe((res: any) => {
        console.log(res);
        this.data = res.data;
        this.page.count = res.total;
        this.rows = res.rows;
      });
  }
}
