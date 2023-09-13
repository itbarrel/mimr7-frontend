import { Component } from '@angular/core';
import { ScheduleService } from '../services/schedule.service';

@Component({
  selector: 'app-completed-schedule',
  templateUrl: './completed-schedule.component.html',
  styleUrls: ['./completed-schedule.component.scss']
})
export class CompletedScheduleComponent {

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
    { name: 'startDate' },
    { name: 'endDate' },
    { name: 'contents' },
    { name: 'createdAt' },
    { name: 'actions' },
  ];

  

  constructor(private scheduleService: ScheduleService) {}
  ngOnInit() {
    this.getAllContents();
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
    this.scheduleService
      .getCompletedSchedules(this.page, this.title)
      .subscribe((res: any) => {
        console.log(res);
        this.data = res.docs;
        this.page.count = res.total;
        this.rows = res.rows;
      });
  }
}