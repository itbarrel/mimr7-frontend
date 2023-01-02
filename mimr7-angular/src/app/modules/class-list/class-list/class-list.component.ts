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

import { BreadCrumbService } from 'src/app/shared/services/breadcrumb.service';

import { ClassList } from 'src/app/shared/interfaces';
import { ClassListService } from '../services/class-list.services';

@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.scss']
})
export class ClassListComponent implements OnInit {

  isLoadingResults = true;
  resultsLength = 0;
  name: string = '';
  updateContent: boolean = false;
  selectedContent: ClassList = {
    name: '',
    description:''
  };


  displayedColumns: string[] = ['name', 'description','contents','students','createdAt', 'action'];
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
    private breadCrumbService: BreadCrumbService,
    private classListService: ClassListService
  ) {}

  ngOnInit(): void {
    this.breadCrumbService.setrouteState('Students');
    this.getAllStudents()
  }


  getAllStudents() {
    this.classListService.getAll(1, 10, this.currentSort).subscribe((res) => {
      console.log(res);
    });
    this.data = combineLatest(this.currentSort, this.page).pipe(
      switchMap(([sortChange, page]) => {
        console.log('PAge Change', sortChange, page);
        this.isLoadingResults = true;
        return this.classListService.getAll(
          page.pageIndex + 1,
          page.pageSize,
          sortChange,
          this.name
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
    console.log('filter', this.name);
    this.getAllStudents();
  }
  clearFilters() {
    this.name = '';
    this.getAllStudents();
  }
  editContent(data: ClassList) {
    this.selectedContent = data;
    this.updateContent = true;
  }
}
