import { MatDialog } from '@angular/material/dialog';
import { OrganizationModalComponent } from '../organization-modal/organization-modal.component';
import { OrganizationService } from '../services/organization.service';
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

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss'],
  host: {
    class: 'organization-container',
  },
})
export class OrganizationComponent implements OnInit {
  path: string = 'Dashboard';
  active: string = 'Organizations';
  isLoadingResults = true;
  resultsLength = 0;
  pageSize = 100;

  displayedColumns: string[] = [
    'name',
    'status',
    'description',
    'createdAt',
    'action',
  ];
  data!: Observable<any[]>;
  currentPage = new BehaviorSubject<number>(1);
  currentSort = new BehaviorSubject<MatSort>({} as MatSort);

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort = {} as MatSort;

  constructor(
    public dialog: MatDialog,
    private organizationService: OrganizationService
  ) {}

  ngOnInit(): void {
    this.getAllOrganizations();
  }

  openOrganizationModal(): void {
    const dialogRef = this.dialog.open(OrganizationModalComponent, {
      width: '50%',
      minHeight: 'calc(100vh - 90px)',
      height: 'auto',
      data: { name: 'open', animal: 'dialoge' },
      panelClass: 'custom-dialog-container',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
      this.getAllOrganizations();
    });
  }

  getAllOrganizations() {
    this.organizationService.getAll().subscribe((res) => {
      console.log(res);
    });
    this.data = combineLatest(this.currentSort, this.currentPage).pipe(
      // startWith([undefined, ]),
      switchMap(([sortChange, currentPage]) => {
        console.log('PAge Change', sortChange, currentPage);
        this.isLoadingResults = true;
        return this.organizationService.getAll();
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
    console.log('called', pageChanged);
  }
}
