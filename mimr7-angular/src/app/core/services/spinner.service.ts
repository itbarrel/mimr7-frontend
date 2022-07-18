import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  constructor(private spinner: NgxSpinnerService) {}

  show() {
    console.log('shoe spinner called');
    this.spinner.show();
  }
  hide() {
    console.log('hide spinner called');
    this.spinner.hide();
  }
}
