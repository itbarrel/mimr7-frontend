import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Location } from 'src/app/shared/interfaces';
import { withQuery } from 'with-query';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';


@Injectable({
    providedIn: 'root',
  })
  export class LocationService {
    private locationState = new BehaviorSubject<Location[]>([]);
    locationState$ = this.locationState.asObservable();
    user: any;
    constructor(private http: HttpClient, private auth: AuthenticationService) {
      this.auth.getUserState().subscribe((res) => {
        this.user = res;
      });
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
      return this.http.post(`${environment.apiUrl}locations`, data);
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
        `${environment.apiUrl}locations?offset=${pageNumber}&limit=${pageSize}`,
        query
      );
      return this.http.get(url);
    }
    getLocationById(id: string) {
      return this.http.get(`${environment.apiUrl}locations/${id}`);
    }
    updateLocation(id: string, data: Location) {
      return this.http.put(`${environment.apiUrl}locations/${id}`, data);
    }
  }