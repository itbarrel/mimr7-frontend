import { Component, OnInit } from '@angular/core';
import { SpinnerService } from 'src/app/core/services/spinner.service';
import { ToasterService } from 'src/app/core/services/toaster.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private spinner:SpinnerService,private toaster: ToasterService) { }

  ngOnInit(): void {
    // this.spinner.show();
    this.toaster.showError('Error');

    // this.toastr.success('Hello world!', 'Toastr fun!');

    setTimeout(()=>{
      this.spinner.hide();
    },2000)
  }

}
