import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Collection } from 'src/app/shared/interfaces';
// import { WithQueryOptions } from 'with-query/dist';
import { withQuery } from 'with-query';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class CollectionService {
  private collectionState = new BehaviorSubject<Collection[]>([]);
  collectionState$ = this.collectionState.asObservable();
  user: any;
  constructor(private http: HttpClient,private auth:AuthenticationService) {
    this.auth.getUserState().subscribe((res) => {
      this.user = res
    });
  }

  getCollectionState() {
    return this.collectionState$;
  }
  setCollectionState(collection: Collection[]) {
    this.collectionState.next(collection);
  }

  addCollection(data: Collection): Observable<any> {
    data.AccountId=this.user.AccountId
    return this.http.post(`${environment.apiUrl}Collections`, data);
  }

  getAll(
    pageNumber: number,
    pageSize: number,
    sortChange?: any,
    title?: string
  ) {
    const sort: any = {};
    sort[sortChange.active] = sortChange.direction;
    const query = {
      sort,
    };

    const url = withQuery(
      `${environment.apiUrl}collections?offset=${pageNumber}&limit=${pageSize}&title=${title}`,
      query
    );
    return this.http.get(url);
  }
  getCollectionById(id: string) {
    return this.http.get(`${environment.apiUrl}collections/${id}`);
  }
  updateCollection(id: string, data: Collection) {
    return this.http.put(`${environment.apiUrl}collections/${id}`, data);
  }
}
