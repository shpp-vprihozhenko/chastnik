import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class CommonDataService {
  commonDataObj = {
    city: '',
    user: {}
  };

  constructor() {
  }

  async checkUser(email:string, pwd: string) {
    let response = await fetch('/user/identify/'+email+'/'+pwd);
    let myJson = await response.json();
    console.log('got resp', myJson);
    let name = 'ttt';
    this.commonDataObj.user = {email, name};
    return true;
  }

  async fetchCity() {
    let response = await fetch('http://ua.sxgeo.city/');
    let myJson = await response.json();
    //console.log(JSON.stringify(myJson));
    console.log('city', myJson.city.name_ru);
    console.log('ip', myJson.ip);
    this.commonDataObj.city = myJson.city.name_ru;
    return myJson.city.name_ru;
  }
}
