import { Component } from '@angular/core';
import { ScheduleService } from '../services/schedule.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent {

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

  

  // export interface Schedule {
  //   id?: string;
  //   startDate: Date;
  //   endDate: Date;
  //   AccountId?: string;
  //   OrganizationId?: string;
  //   ClassListId?:string
  //   ContentId?:string
  //   updatedAt?: Date;
  //   createdAt?: Date;
  //   deletedAt?: any;
  //   active?:boolean;
  // }
  

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
      .getAll(this.page, this.title)
      .subscribe((res: any) => {
        console.log(res);
        this.data = res.data;
        this.page.count = res.total;
        this.rows = res.rows;
      });
  }
}


