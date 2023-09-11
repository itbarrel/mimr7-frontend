import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

// import { this.env } from 'src/this.envs/this.env';
import { Content } from 'src/app/shared/interfaces';
// import { WithQueryOptions } from 'with-query/dist';
import { withQuery } from 'with-query';
import { EnvService } from 'src/app/env.service';
import { AuthService } from 'src/app/core/service/auth.service';


@Injectable({
  providedIn: 'root',
})
export class ContentService {
  private contentState = new BehaviorSubject<Content[]>([]);
  contentState$ = this.contentState.asObservable();
  user: any;
  constructor(private http: HttpClient, private auth: AuthService,private env: EnvService) {
    this.user = this.auth.getInitialUser()
    // this.auth.getInitialUser().subscribe((res:any) => {
    //   this.user = res;
    // });
  }

  get() {
    return this.contentState$;
  }
  set(content: Content[]) {
    this.contentState.next(content);
  }

  add(data: Content): Observable<any> {
    data.AccountId = this.user.AccountId;
    data.UserId = this.user.id;
    return this.http.post(`${this.env.apiUrl}contents`, data);
  }

  getAll(
    page:any,
    title?: string
  ) {
    const sort: any = {};
    if(page.orderBy){
      sort[page?.orderBy] = page?.orderDir;
    }
    const query = {
      sort,
    };

    const url = withQuery(
      `${this.env.apiUrl}contents?offset=${page.offset+1}&limit=${page.limit}&title=${title}`,
      query
    );
    return this.http.get(url);
  }
  getById(id: string) {
    return this.http.get(`${this.env.apiUrl}contents/${id}`);
  }
  update(id: string, data: Content) {
    return this.http.put(`${this.env.apiUrl}contents/${id}`, data);
  }

  getContentByClassId(id: string) {
    return this.http.get(`${this.env.apiUrl}contents/klass/${id}`);
  }

  createGPTHighlights(id:string){
    return this.http.post(`${this.env.apiUrl}contents/${id}/gptHighlights`,{});    
  }
}
