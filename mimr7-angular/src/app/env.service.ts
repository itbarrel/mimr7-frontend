import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EnvService {
  public apiUrl = 'http://localhost:8080/v1/';
  public privateKey = 'mimr7';
}
