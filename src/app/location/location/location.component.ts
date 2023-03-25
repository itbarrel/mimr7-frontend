import { Component } from '@angular/core';
import { LocationService } from '../services/location.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
})
export class LocationComponent {
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
    { name: 'address1' },
    // { name: 'address2' },
    // { name: 'address3' },
    { name: 'mobilePhone' },
    { name: 'officePhone' },
    { name: 'country' },
    { name: 'state' },
    { name: 'city' },
    { name: 'type' },
    { name: 'location' },
    { name: 'createdAt' },
  ];

  constructor(private locationService: LocationService) {}
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
    this.locationService.getAll(this.page, this.title).subscribe((res: any) => {
      console.log(res);
      this.data = res.data;
      this.page.count = res.total;
      this.rows = res.rows;
    });
  }
}
