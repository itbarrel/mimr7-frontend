import { Component } from '@angular/core';
import { AccountService } from '../services/account.service';
import { AccountEditModalComponent } from '../account-edit-modal/account-edit-modal.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent {
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
    { name: 'description' },
    { name: 'createdAt' },
  ];

  constructor(private accountService: AccountService,
    public dialog: MatDialog,
    ) {}
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
    this.accountService.getAll(this.page, this.title).subscribe((res: any) => {
      console.log(res);
      this.data = res.data;
      this.page.count = res.total;
      this.rows = res.rows;
    });
  }

  openEditDialogue(data: any) {
    const dialogRef = this.dialog.open(AccountEditModalComponent, {
      width: '50%',
      // minHeight:'600px' ,
      height: 'auto',
      data,
      // disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
      this.getAllContents();
    });
  }
}
