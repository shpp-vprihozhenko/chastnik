import { Component } from '@angular/core';
import { CommonDataService } from './common-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'frontForChastnik';
  commonData: any;
  city: string = 'нашего города';

  constructor(private commonDataServ: CommonDataService) { 
    this.commonData = commonDataServ.commonDataObj;
    commonDataServ.fetchCity()
    .then(city => {
      this.city = "города "+city;
      console.log('got city', city);
    });
  }

  logoff() {
    console.log('logoffing');
    this.commonData.user = {};
  }

  ngOnInit() {
  }
}
