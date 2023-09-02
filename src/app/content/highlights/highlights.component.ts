import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HighlightService } from '../services/highlight.service';

@Component({
  selector: 'app-highlights',
  templateUrl: './highlights.component.html',
  styleUrls: ['./highlights.component.scss']
})
export class HighlightsComponent {

  page = {
    limit: 10,
    count: 0,
    offset: 0,
    orderBy: '',
    orderDir: '',
  };

  rows: Object[];
  title: string = '';
  contentId=''

  data: any[] = [];
  columns = [{ name: 'content' }, { name: 'messages' }, { name: 'createdAt' }];

  constructor(private highlightServic: HighlightService,
    private route: ActivatedRoute
    ) {}
  ngOnInit() {
    this.contentId = this.route.snapshot.paramMap.get('id') || '';
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
    this.highlightServic.getByContentId(this.page, this.contentId ,this.title).subscribe((res: any) => {
      console.log(res);
      this.data = res.data;
      this.page.count = res.total;
      this.rows = res.rows;
    });
  }
}
