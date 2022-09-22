import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { OrganizationService } from '../services/organization.service';
import { MatDialog } from '@angular/material/dialog';
import {
  Observable,
  of as observableOf,
  BehaviorSubject,
  combineLatest,
} from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { OrganizationModalComponent } from '../organization-modal/organization-modal.component';
import { Organization } from 'src/app/shared/interfaces';
import { BreadCrumbService } from 'src/app/shared/services/breadcrumb.service';

@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.scss'],
  host: {
    class: 'organization-container',
  },
})
export class OrganizationsComponent implements OnInit {
  path: string = 'Dashboard';
  active: string = 'Organizations';
  isLoadingResults = true;
  resultsLength = 0;
  name = '';

  displayedColumns: string[] = [
    'name',
    'status',
    'city',
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
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort = {} as MatSort;

  constructor(
    private organizationService: OrganizationService,
    private dialog: MatDialog,
    private breadCrumbService: BreadCrumbService
  ) {}

  ngOnInit(): void {
    this.breadCrumbService.setrouteState('Organizations');
    this.getAllOrganizations();
  }

  getAllOrganizations() {
    this.organizationService
      .getAll(1, 10, this.currentSort)
      .subscribe((res) => {
        console.log(res);
      });
    this.data = combineLatest(this.currentSort, this.page).pipe(
      // startWith([undefined, ]),
      switchMap(([sortChange, page]) => {
        console.log('PAge Change', sortChange, page);
        this.isLoadingResults = true;
        return this.organizationService.getAll(
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

  searchByFilters() {
    console.log('filter', this.name);
    this.getAllOrganizations();
  }
  clearFilters() {
    this.name = '';
    this.getAllOrganizations();
  }

  openOrganizationModal(data?: Organization): void {
    const dialogRef = this.dialog.open(OrganizationModalComponent, {
      width: '50%',
      // minHeight: 'calc(100vh - 90px)',
      data,
      autoFocus: false,
      height: 'auto',
      panelClass: 'custom-dialog-container',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed', result);
      if (result.success) {
        this.getAllOrganizations();
      }
    });
  }
}
