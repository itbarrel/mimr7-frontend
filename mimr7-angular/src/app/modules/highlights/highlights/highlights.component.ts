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
import { Highlight } from 'src/app/shared/interfaces';
import { HighlightService } from '../services/highlights.services';
import { BreadCrumbService } from 'src/app/shared/services/breadcrumb.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-highlights',
  templateUrl: './highlights.component.html',
  styleUrls: ['./highlights.component.scss']
})
export class HighlightsComponent implements OnInit {
  path: string = 'Dashboard';
  active: string = 'Highlights';
  isLoadingResults = true;
  resultsLength = 0;
  title = '';

  displayedColumns: string[] = [
    'content',
    'order',
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

    private highlightService:HighlightService,
    private dialog: MatDialog,
    private breadCrumbService: BreadCrumbService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.breadCrumbService.setrouteState('Collections');

    this.getAllHighlights();
  }

  getAllHighlights() {
    this.highlightService.getAll(1, 10, this.currentSort).subscribe((res) => {
      console.log(res);
    });
    this.data = combineLatest(this.currentSort, this.page).pipe(
      switchMap(([sortChange, page]) => {
        console.log('PAge Change', sortChange, page);
        this.isLoadingResults = true;
        return this.highlightService.getAll(
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
    this.getAllHighlights();
  }
  clearFilters() {
    this.title = '';
    this.getAllHighlights();
  }

  openCollectionModal(data?: Highlight): void {
    console.log(data)
    
  }

}