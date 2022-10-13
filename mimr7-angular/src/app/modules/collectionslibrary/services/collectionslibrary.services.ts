import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { CollectionLibrary } from 'src/app/shared/interfaces';
// import { WithQueryOptions } from 'with-query/dist';
import { withQuery } from 'with-query';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class CollectionLibraryService {
  private collectionLibraryState = new BehaviorSubject<CollectionLibrary[]>([]);
  collectionLibraryState$ = this.collectionLibraryState.asObservable();
  user: any;
  constructor(private http: HttpClient, private auth: AuthenticationService) {
    this.auth.getUserState().subscribe((res) => {
      this.user = res;
    });
  }

  getState() {
    return this.collectionLibraryState$;
  }
  setState(collectionLibrary: CollectionLibrary[]) {
    this.collectionLibraryState.next(collectionLibrary);
  }

  add(data: CollectionLibrary): Observable<any> {
    data.AccountId = this.user.AccountId;
    // data.UserId = this.user.id;
    return this.http.post(`${environment.apiUrl}collectionLibraries`, data);
  }

  getAll(
    pageNumber: number,
    pageSize: number,
    sortChange?: any,
    content?: string
  ) {
    const sort: any = {};
    sort[sortChange.active] = sortChange.direction;
    const query = {
      sort,
    };

    const url = withQuery(
      `${environment.apiUrl}collectionLibraries?offset=${pageNumber}&limit=${pageSize}&title=${content}`,
      query
    );
    return this.http.get(url);
  }
  geById(id: string) {
    return this.http.get(`${environment.apiUrl}collectionLibraries/${id}`);
  }
  update(id: string, data: CollectionLibrary) {
    return this.http.put(`${environment.apiUrl}collectionLibraries/${id}`, data);
  }
}
