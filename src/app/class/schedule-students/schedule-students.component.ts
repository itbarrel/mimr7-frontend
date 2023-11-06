import { Component } from '@angular/core';
import { ScheduleService } from '../services/schedule.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-schedule-students',
  templateUrl: './schedule-students.component.html',
  styleUrls: ['./schedule-students.component.scss']
})
export class ScheduleStudentsComponent {

  scheduleId:string=''
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
    { name: 'contact' },
    { name: 'actions' },
  ];


  constructor(private scheduleService: ScheduleService,private route: ActivatedRoute){

  }


  ngOnInit() {

    this.scheduleId = this.route.snapshot.paramMap.get('id') || '';
    console.log("🚀 ~ file: schedule-students.component.ts:22 ~ ScheduleStudentsComponent ~ ngOnInit ~ this.scheduleId:", this.scheduleId)
    this.getAllData()

  }


  pageCallback(pageInfo: {
    count?: number;
    pageSize?: number;
    limit?: number;
    offset?: number;
  }) {
    this.page.offset = pageInfo.offset || 0;
    this.getAllData();
  }

  sortCallback(sortInfo: {
    sorts: { dir: string; prop: string }[];
    column: {};
    prevValue: string;
    newValue: string;
  }) {
    this.page.orderDir = sortInfo.sorts[0].dir;
    this.page.orderBy = sortInfo.sorts[0].prop;
    this.getAllData();
  }

  getAllData() {
    console.log('page', this.page);
    this.scheduleService
      .getStudentsByScheduleID(this.scheduleId,this.page, this.title)
      .subscribe((res: any) => {
        console.log(res);
        this.data = res.data;
        this.page.count = res.pages;
        this.rows = res.total;
      });
  }

}
