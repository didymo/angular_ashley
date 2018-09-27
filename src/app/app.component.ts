import {Component} from '@angular/core';
import {AppData} from './app-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'major990';

  constructor(appData: AppData) {
    console.log('Inside the AppComponent Constructor');
    console.log('AppComponent - ', appData.jwtkey);
    console.log('AppComponent - ', appData.eventid);
  }
}
