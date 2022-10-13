import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {
  Observable,
  of as observableOf,
  BehaviorSubject,
  combineLatest,
} from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { BreadCrumbService } from 'src/app/shared/services/breadcrumb.service';
import { CollectionLibraryService } from '../services/collectionslibrary.services';
@Component({
  selector: 'app-collectionslibrary',
  templateUrl: './collectionslibrary.component.html',
  styleUrls: ['./collectionslibrary.component.scss']
})
export class CollectionslibraryComponent implements OnInit {

  path: string = 'Dashboard';
  // active: string = 'Highlights Library';
  isLoadingResults = true;
  resultsLength = 0;
  title = '';

  displayedColumns: string[] = [
    'title',
    'active',
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
    
    private collectionLibraryService:CollectionLibraryService,
    private breadCrumbService: BreadCrumbService,
  ) { }

  ngOnInit(): void {

    this.breadCrumbService.setrouteState('Collections Library');
    this.getAll();
  }

  
  getAll() {
    this.collectionLibraryService.getAll(1, 10, this.currentSort).subscribe((res) => {
      console.log(res);
    });
    this.data = combineLatest(this.currentSort, this.page).pipe(
      switchMap(([sortChange, page]) => {
        console.log('PAge Change', sortChange, page);
        this.isLoadingResults = true;
        return this.collectionLibraryService.getAll(
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
    this.getAll();
  }
  clearFilters() {
    this.title = '';
    this.getAll();
  }

}
