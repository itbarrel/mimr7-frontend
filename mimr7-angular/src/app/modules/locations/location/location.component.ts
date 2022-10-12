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
import { Location } from 'src/app/shared/interfaces';
import { BreadCrumbService } from 'src/app/shared/services/breadcrumb.service';
import { Router } from '@angular/router';
import { LocationService } from '../services/location.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {
  path: string = 'Dashboard';
  active: string = 'Locations';
  isLoadingResults = true;
  resultsLength = 0;
  title = '';

  displayedColumns: string[] = [
    'address1',
    'address2',
    'address3',
    'mobilePhone',
    'officePhone',
    'country',
    'state',
    'city',
    'type',
    'location',
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

    private locationService:LocationService,
    private dialog: MatDialog,
    private breadCrumbService: BreadCrumbService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.breadCrumbService.setrouteState('Collections');

    this.getAllLocations();
  }

  getAllLocations() {
    this.locationService.getAll(1, 10, this.currentSort).subscribe((res) => {
      console.log(res);
    });
    this.data = combineLatest(this.currentSort, this.page).pipe(
      switchMap(([sortChange, page]) => {
        console.log('PAge Change', sortChange, page);
        this.isLoadingResults = true;
        return this.locationService.getAll(
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
    this.getAllLocations();
  }
  clearFilters() {
    this.title = '';
    this.getAllLocations();
  }

  openCollectionModal(data?: Location): void {
    console.log(data)
    
  }
}
