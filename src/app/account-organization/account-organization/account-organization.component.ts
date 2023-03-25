import { Component } from '@angular/core';
import { OrganizationService } from '../services/account-organization.service';

@Component({
  selector: 'app-account-organization',
  templateUrl: './account-organization.component.html',
  styleUrls: ['./account-organization.component.scss'],
})
export class AccountOrganizationComponent {
  // 'name',
  // 'status',
  // 'city',
  // 'createdAt',
  // 'action',

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
    { name: 'status' },
    { name: 'city' },
    { name: 'createdAt' },
  ];

  constructor(private organizationService: OrganizationService) {}
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
    this.organizationService
      .getAll(this.page, this.title)
      .subscribe((res: any) => {
        console.log(res);
        this.data = res.data;
        this.page.count = res.total;
        this.rows = res.rows;
      });
  }
}
