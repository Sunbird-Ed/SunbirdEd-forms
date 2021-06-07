import { Component } from '@angular/core';
import { timer } from './formConfig';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sunbird-forms';
  config: any  = timer;

  output(event) {
    console.log(event);
  }

  valueChanges(event) {
    console.log(event);
  }

  statusChanges(event) {
    console.log(event);
  }

}
