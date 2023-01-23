import { Component, OnInit } from '@angular/core';
import { EnvService } from './env.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'mimr7-angular';

  constructor(private env: EnvService) {}
  ngOnInit() {
    console.log('sadfasjkdhfsdjfsad', this.env.privateKey);
  }
}
