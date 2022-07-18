import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/core/services/loader.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent implements OnInit {
  loading: boolean = false;
  constructor(
    private loaderService: LoaderService,
    private spinner: NgxSpinnerService
  ) {
    this.loaderService.isLoading.subscribe((v) => {
      if (v) {
        if (!this.loading) {
          this.show();
        }
        this.loading = true;
      } else {
        if (this.loading) {
          this.hide();
        }
        this.loading = false;
      }
    });
  }

  ngOnInit(): void {}

  show() {
    this.spinner.show();
  }
  hide() {
    this.spinner.hide();
  }
}
