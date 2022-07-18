import { Component, OnInit } from '@angular/core';
import { SpinnerService } from 'src/app/core/services/spinner.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private spinner:SpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();

    setTimeout(()=>{
      this.spinner.hide();
    },2000)
  }

}
