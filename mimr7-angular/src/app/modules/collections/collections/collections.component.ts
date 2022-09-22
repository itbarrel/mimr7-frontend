import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import {
  Observable,
  of as observableOf,
  BehaviorSubject,
  combineLatest,
} from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
// import { OrganizationModalComponent } from '../organization-modal/organization-modal.component';
import { Collection } from 'src/app/shared/interfaces';
import { CollectionService } from '../services/collections.service';
import { CollectionModalComponent } from '../collection-modal/collection-modal.component';
import { BreadCrumbService } from 'src/app/shared/services/breadcrumb.service';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss'],
  host: {
    class: 'organization-container',
  },
})
export class CollectionsComponent implements OnInit {
  path: string = 'Dashboard';
  active: string = 'Collections';
  isLoadingResults = true;
  resultsLength = 0;
  title = '';

  displayedColumns: string[] = [
    'title',
    'type',
    'createdAt',
    'description',
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
    private collectionService: CollectionService,
    private dialog: MatDialog,
    private breadCrumbService: BreadCrumbService
  ) {}

  ngOnInit(): void {
    this.breadCrumbService.setrouteState('Collections');

    this.getAllCollections();
  }

  getAllCollections() {
    this.collectionService.getAll(1, 10, this.currentSort).subscribe((res) => {
      console.log(res);
    });
    this.data = combineLatest(this.currentSort, this.page).pipe(
      switchMap(([sortChange, page]) => {
        console.log('PAge Change', sortChange, page);
        this.isLoadingResults = true;
        return this.collectionService.getAll(
          page.pageIndex + 1,
          page.pageSize,
          sortChange,
          this.title
        );
      }),
      map((data: any) => {
        this.isLoadingResults = false;
        this.resultsLength = data.total;

        return data.data;
      }),
      catchError(() => {
        this.isLoadingResults = false;
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
    console.log('filter', this.title);
    this.getAllCollections();
  }
  clearFilters() {
    this.title = '';
    this.getAllCollections();
  }

  openCollectionModal(data?: Collection): void {
    const dialogRef = this.dialog.open(CollectionModalComponent, {
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
        this.getAllCollections();
      }
    });
  }
}
