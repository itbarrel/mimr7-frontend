import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Highlight } from 'src/app/shared/interfaces';
// import { WithQueryOptions } from 'with-query/dist';
import { withQuery } from 'with-query';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class HighlightService {
  private highlightState = new BehaviorSubject<any[]>([]);
  highlightState$ = this.highlightState.asObservable();
  user: any;
  constructor(private http: HttpClient, private auth: AuthenticationService) {
    this.auth.getUserState().subscribe((res) => {
      this.user = res;
    });
  }

  get() {
    return this.highlightState$;
  }
  set(highlight: Highlight[]) {
    this.highlightState.next(highlight);
  }

  add(data: Highlight): Observable<any> {
    data.AccountId = this.user.AccountId;
    // data.UserId = this.user.id;
    return this.http.post(`${environment.apiUrl}highlights`, data);
  }
  // ?ContentId={{ContentId}}

  getByContentId(
    pageNumber: number,
    pageSize: number,
    contentId:string,
    sortChange?: any,
    title?: string,
  ) {
    const sort: any = {};
    sort[sortChange?.active] = sortChange?.direction;
    const query = {
      sort,
    };

    const url = withQuery(
      `${environment.apiUrl}highlights?offset=${pageNumber}&limit=${pageSize}&ContentId=${contentId}&content=${title}`,
      query
    );
    return this.http.get(url);
  }

  getAll(
    pageNumber: number,
    pageSize: number,
    sortChange?: any,
    title?: string
  ) {
    const sort: any = {};
    sort[sortChange?.active] = sortChange?.direction;
    const query = {
      sort,
    };

    const url = withQuery(
      `${environment.apiUrl}highlights?offset=${pageNumber}&limit=${pageSize}&content=${title}`,
      query
    );
    return this.http.get(url);
  }
  getById(id: string) {
    return this.http.get(`${environment.apiUrl}highlights/${id}`);
  }
  update(id: string, data: Highlight) {
    return this.http.put(`${environment.apiUrl}highlights/${id}`, data);
  }
}