import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
// import { SpinnerService } from 'src/app/core/services/spinner.service';
import { ToasterService } from 'src/app/core/services/toaster.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(
    // private spinner:SpinnerService,
    private http: HttpClient,
    private toaster: ToasterService
  ) {}

  ngOnInit(): void {
    // // this.spinner.show();
    // this.toaster.showError('Error');

    // // this.toastr.success('Hello world!', 'Toastr fun!');

    // // setTimeout(()=>{
    // //   this.spinner.hide();
    // // },2000)
  }

  callAPI() {
    for (let i = 0; i < 10; i++) {
      this.http
        .get('https://62d51990d4406e523552cbe1.mockapi.io/api/v1/users')
        .subscribe((res) => {
          console.log('res', res);
        });
    }
  }
}
