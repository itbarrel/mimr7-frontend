import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { EnvService } from 'src/app/env.service';
import { MessageAnswer } from 'src/app/shared/interfaces';


@Injectable({
  providedIn: 'root',
})
export class MessageScheduleService {
  constructor(private http: HttpClient, private env: EnvService) {}

  getByHash(id: string) {
    return this.http.get(
      `${this.env.apiUrl}messageSchedules/details?hash=${id}`
    );
  }


  submitAnswer(messageAnswer: MessageAnswer) {
    return this.http.post(
      `${this.env.apiUrl}messageScheduleAnswers`,
      messageAnswer
    );
  }
}


