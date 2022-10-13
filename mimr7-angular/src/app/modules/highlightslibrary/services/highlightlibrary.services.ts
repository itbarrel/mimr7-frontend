import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { HighlightLibrary } from 'src/app/shared/interfaces';
// import { WithQueryOptions } from 'with-query/dist';
import { withQuery } from 'with-query';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class HighlightLibraryService {
  private highlightLibraryState = new BehaviorSubject<HighlightLibrary[]>([]);
  highlightLibraryState$ = this.highlightLibraryState.asObservable();
  user: any;
  constructor(private http: HttpClient, private auth: AuthenticationService) {
    this.auth.getUserState().subscribe((res) => {
      this.user = res;
    });
  }

  getState() {
    return this.highlightLibraryState$;
  }
  setState(highlightLibrary: HighlightLibrary[]) {
    this.highlightLibraryState.next(highlightLibrary);
  }

  add(data: HighlightLibrary): Observable<any> {
    data.AccountId = this.user.AccountId;
    // data.UserId = this.user.id;
    return this.http.post(`${environment.apiUrl}highlightLibraries`, data);
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
      `${environment.apiUrl}highlightLibraries?offset=${pageNumber}&limit=${pageSize}&title=${content}`,
      query
    );
    return this.http.get(url);
  }
  geById(id: string) {
    return this.http.get(`${environment.apiUrl}highlightLibraries/${id}`);
  }
  update(id: string, data: HighlightLibrary) {
    return this.http.put(`${environment.apiUrl}highlightLibraries/${id}`, data);
  }
}
