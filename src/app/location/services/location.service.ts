import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

// import { this.env } from 'src/this.envs/this.env';
import { Location } from 'src/app/shared/interfaces';
import { withQuery } from 'with-query';
import { EnvService } from 'src/app/env.service';
import { AuthService } from 'src/app/core/service/auth.service';


@Injectable({
    providedIn: 'root',
  })
  export class LocationService {
    private locationState = new BehaviorSubject<Location[]>([]);
    locationState$ = this.locationState.asObservable();
    user: any;
    constructor(private http: HttpClient, private auth: AuthService,private env: EnvService) {
        this.user = this.auth.getInitialUser()

    }
  
    getLocationState() {
      return this.locationState$;
    }
    setLocationState(highlight: Location[]) {
      this.locationState.next(highlight);
    }
  
    addLocation(data: Location): Observable<any> {
      data.AccountId = this.user.AccountId;
      // data.UserId = this.user.id;
      return this.http.post(`${this.env.apiUrl}locations`, data);
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
        `${this.env.apiUrl}locations?offset=${page.offset+1}&limit=${page.limit}`,
        query
      );
      return this.http.get(url);
    }
    getLocationById(id: string) {
      return this.http.get(`${this.env.apiUrl}locations/${id}`);
    }
    updateLocation(id: string, data: Location) {
      return this.http.put(`${this.env.apiUrl}locations/${id}`, data);
    }
  }