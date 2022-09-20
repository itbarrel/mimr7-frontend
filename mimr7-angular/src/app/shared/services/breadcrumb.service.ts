import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BreadCrumbService {
  private routeState = new BehaviorSubject<String>('')
  routeState$ = this.routeState.asObservable();

  constructor() {}
  getrouteState() {
    return this.routeState$;
  }
  setrouteState(user:string) {
    this.routeState.next(user);
  }
}

