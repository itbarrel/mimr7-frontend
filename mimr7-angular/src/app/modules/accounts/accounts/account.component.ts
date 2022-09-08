import { MatDialog } from '@angular/material/dialog';
import { AccountModalComponent } from '../account-modal/account-modal.component';
import { AccountService } from '../services/account.service';
import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {
  merge,
  Observable,
  of as observableOf,
  BehaviorSubject,
  combineLatest,
} from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { AccountEditModalComponent } from '../account-edit-modal/account-edit-modal.component';
import { MatDatepicker } from '@angular/material/datepicker';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  host: {
    class: 'organization-container',
  },
})
export class AccountsComponent implements OnInit {
  path: string = 'Dashboard';
  active: string = 'Accounts';
  isLoadingResults = true;
  resultsLength = 0;
  name = '';
  // fromDate!: MatDatepicker<any>;
  // toDate!: MatDatepicker<any>;
  // today = new Date();
  // pageSize = 1;
 

  displayedColumns: string[] = [
    'name',
    'status',
    'description',
    'createdAt',
    'action',
  ];
  pageSize = 10;
  data!: Observable<any[]>;
  currentPage = new BehaviorSubject<number>(1);
  page = new BehaviorSubject<any>({
    pageSize: this.pageSize,
    pageIndex: 0,
  });
  currentSort = new BehaviorSubject<MatSort>({} as MatSort);
  pageSizeOptions: number[] = [1, 2, 5, 10, 25, 100];


  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort = {} as MatSort;

  constructor(
    public dialog: MatDialog,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.getAllAccounts();
  }

  openAccountModal(): void {
    const dialogRef = this.dialog.open(AccountModalComponent, {
      width: '50%',
      minHeight: 'calc(100vh - 90px)',
      height: 'auto',
      data: { name: 'open', animal: 'dialoge' },
      panelClass: 'custom-dialog-container',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
      this.getAllAccounts();
    });
  }

  getAllAccounts() {
    // this.accountService.getAll().subscribe((res) => {
    //   console.log(res);
    // });
    this.data = combineLatest(this.currentSort, this.page).pipe(
      // startWith([undefined, ]),
      switchMap(([sortChange, page]) => {
        console.log('PAge Change', sortChange, page,this.name);
        this.isLoadingResults = true;
        return this.accountService.getAll(
          page.pageIndex + 1,
          page.pageSize,
          sortChange,
          this.name
        );
        // return this.exampleDatabase.getRepoIssues(
        //   this.sort.active, this.sort.direction, currentPage);
      }),
      map((data: any) => {
        // Flip flag to show that loading has finished.
        this.isLoadingResults = false;
        this.resultsLength = data.total;

        return data.data;
      }),
      catchError(() => {
        this.isLoadingResults = false;
        // Catch if the GitHub API has reached its rate limit. Return empty data.
        return observableOf([]);
      })
    );
  }

  applySort(sort: any) {
    this.currentSort.next(sort);
  }
  pageChanged(pageChanged: any) {
    this.page.next(pageChanged);
    console.log('called', pageChanged);
  }

  openEditDialogue(data: any) {
    const dialogRef = this.dialog.open(AccountEditModalComponent, {
      width: '30%',
      // minHeight:'600px' ,
      height: 'auto',
      data,
      panelClass: 'custom-dialog-container',
      // disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
      this.getAllAccounts();
    });
  }

  searchByFilters() {
    console.log('filter', this.name);
    this.getAllAccounts()
  }
  clearFilters() {
    this.name=''
    this.getAllAccounts()
  }
}
