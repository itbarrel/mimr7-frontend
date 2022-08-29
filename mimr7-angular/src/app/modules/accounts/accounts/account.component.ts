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
  // pageSize = 1;

  displayedColumns: string[] = [
    'name',
    'status',
    'description',
    'createdAt',
    'action',
  ];
  data!: Observable<any[]>;
  currentPage = new BehaviorSubject<number>(1);
  pageSize = new BehaviorSubject<number>(1);
  currentSort = new BehaviorSubject<MatSort>({} as MatSort);

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
    this.data = combineLatest(this.currentSort, this.currentPage).pipe(
      // startWith([undefined, ]),
      switchMap(([sortChange, currentPage]) => {
        console.log('PAge Change', sortChange, currentPage);
        this.isLoadingResults = true;
        return this.accountService.getAll(1, 10);
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

  changePage(pageNumber: number): void {
    this.currentPage.next(pageNumber);
  }

  applySort(sort: any) {
    this.currentSort.next(sort);
  }
  pageChanged(pageChanged: any) {
    this.pageSize.next(pageChanged);
    console.log('called', pageChanged);
  }

  openEditDialogue(data: any) {
    const dialogRef = this.dialog.open(AccountEditModalComponent, {
      width: '50%',
      minHeight: 'calc(100vh - 90px)',
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
}
