import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  constructor(private toastr: ToastrService) {}

  showSuccess(msg: string) {
    this.toastr.success(msg);
  }
  showError(msg: string) {
    console.log('tost')
    this.toastr.error(msg);
  }
  showWarn(msg: string) {
    this.toastr.warning(msg);
  }
}
