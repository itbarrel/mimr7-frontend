import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

// import { this.env } from 'src/this.envs/this.env';
import { Message } from 'src/app/shared/interfaces';
// import { WithQueryOptions } from 'with-query/dist';
import { withQuery } from 'with-query';
// import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { EnvService } from 'src/app/env.service';
import { AuthService } from 'src/app/core/service/auth.service';


@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private messageState = new BehaviorSubject<any[]>([]);
  messageState$ = this.messageState.asObservable();
  user: any;
  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private env: EnvService
  ) {
    // this.auth.getInitialUser().subscribe((res) => {
    //   this.user = res;
    // });
    this.user = this.auth.getInitialUser()
  }

  get() {
    return this.messageState$;
  }
  set(highlight: Message[]) {
    this.messageState.next(highlight);
  }

  add(data: Message): Observable<any> {

    console.log("🚀 ~ file: message.service.ts:42 ~ MessageService ~ add ~ this.user:", this.user)
    // this.auth.getCu
    data.AccountId = this.user.AccountId;
    // data.UserId = this.user.id;
    return this.http.post(`${this.env.apiUrl}messages`, data);
  }
  // ?ContentId={{ContentId}}

  getByHighlightId(highlightId: string, title?: string) {
    // const sort: any = {};
    // sort[sortChange?.active] = sortChange?.direction;
    // const query = {
    //   sort,
    // };

    const url = withQuery(
      `${this.env.apiUrl}messages?HighlightId=${highlightId}&name=${title}`
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
      `${this.env.apiUrl}messages?offset=${pageNumber}&limit=${pageSize}&content=${title}`,
      query
    );
    return this.http.get(url);
  }
  getById(id: string) {
    return this.http.get(`${this.env.apiUrl}messages/${id}`);
  }
  update(id: string, data: Message) {
    return this.http.put(`${this.env.apiUrl}messages/${id}`, data);
  }

  createBulk(data: Message[]): Observable<any> {

    return this.http.post(`${this.env.apiUrl}messages/bulkCreate`, {messages:data});
  }
}
