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
import { Content } from 'src/app/shared/interfaces';
import { BreadCrumbService } from 'src/app/shared/services/breadcrumb.service';
import { Router } from '@angular/router';
import { ContentService } from '../services/content.services';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit {
  path: string = 'Dashboard';
  active: string = 'Contents';
  isLoadingResults = true;
  resultsLength = 0;
  title: string = '';
  updateContent: boolean = false;
  selectedContent: Content = {
    title: '',
  };

  displayedColumns: string[] = ['title', 'highlights', 'createdAt', 'action'];
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
    private contentService: ContentService,
    private dialog: MatDialog,
    private breadCrumbService: BreadCrumbService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.breadCrumbService.setrouteState('Collections');

    this.getAllContents();
  }

  getAllContents() {
    this.contentService.getAll(1, 10, this.currentSort).subscribe((res) => {
      console.log(res);
    });
    this.data = combineLatest(this.currentSort, this.page).pipe(
      switchMap(([sortChange, page]) => {
        console.log('PAge Change', sortChange, page);
        this.isLoadingResults = true;
        return this.contentService.getAll(
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
    this.getAllContents();
  }
  clearFilters() {
    this.title = '';
    this.getAllContents();
  }
  editContent(data: Content) {
    this.selectedContent = data;
    this.updateContent = true;
  }
}
